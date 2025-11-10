import { 
  CloudFrontClient, 
  GetDistributionCommand,
  UpdateDistributionCommand,
  GetDistributionConfigCommand,
  CreateInvalidationCommand
} from '@aws-sdk/client-cloudfront';
import { 
  Route53Client, 
  CreateHostedZoneCommand,
  GetHostedZoneCommand,
  ListHostedZonesByNameCommand,
  ChangeResourceRecordSetsCommand,
  ListResourceRecordSetsCommand,
  GetChangeCommand,
  HostedZone
} from '@aws-sdk/client-route-53';
import { 
  ACMClient, 
  RequestCertificateCommand,
  DescribeCertificateCommand,
  ListCertificatesCommand,
  CertificateStatus
} from '@aws-sdk/client-acm';

interface AWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

interface DNSRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

interface HostedZoneInfo {
  zoneId: string;
  nameservers: string[];
  status: 'PENDING' | 'INSYNC';
}

interface CertificateInfo {
  arn: string;
  status: CertificateStatus;
  domainName: string;
  validationRecords?: Array<{
    name: string;
    value: string;
    type: string;
  }>;
}

class AWSService {
  private cloudfront: CloudFrontClient;
  private route53: Route53Client;
  private acm: ACMClient;
  private distributionId: string;
  private cloudfrontDomain: string;

  constructor() {
    const config: AWSConfig = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      region: 'us-east-1' // ACM certificates for CloudFront must be in us-east-1
    };

    if (!config.accessKeyId || !config.secretAccessKey) {
      console.warn('⚠️ AWS credentials not configured');
    }

    this.cloudfront = new CloudFrontClient(config);
    this.route53 = new Route53Client(config);
    this.acm = new ACMClient(config);
    
    // We'll create the CloudFront distribution ID dynamically or store it
    this.distributionId = process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID || '';
    this.cloudfrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN || '';
  }

  /**
   * Create a Route53 hosted zone for a custom domain
   */
  async createHostedZone(domain: string): Promise<HostedZoneInfo> {
    try {
      // Check if zone already exists
      const existingZone = await this.getHostedZone(domain);
      if (existingZone) {
        console.log(`✓ Hosted zone already exists for ${domain}`);
        return existingZone;
      }

      console.log(`Creating Route53 hosted zone for ${domain}...`);
      
      const command = new CreateHostedZoneCommand({
        Name: domain,
        CallerReference: `${domain}-${Date.now()}`,
        HostedZoneConfig: {
          Comment: `Hosted zone for insurance agent website: ${domain}`,
          PrivateZone: false
        }
      });

      const response = await this.route53.send(command);
      
      if (!response.HostedZone || !response.DelegationSet || !response.HostedZone.Id) {
        throw new Error('Failed to create hosted zone - missing response data');
      }

      const zoneId = response.HostedZone.Id.replace('/hostedzone/', '');
      const nameservers = response.DelegationSet.NameServers || [];

      console.log(`✅ Created Route53 hosted zone: ${zoneId}`);
      console.log(`📋 Nameservers:`, nameservers);

      return {
        zoneId,
        nameservers,
        status: 'PENDING'
      };
    } catch (error: any) {
      console.error('Error creating Route53 hosted zone:', error.message);
      throw new Error(`Failed to create hosted zone: ${error.message}`);
    }
  }

  /**
   * Get existing hosted zone for a domain
   */
  async getHostedZone(domain: string): Promise<HostedZoneInfo | null> {
    try {
      const command = new ListHostedZonesByNameCommand({
        DNSName: domain,
        MaxItems: 1
      });

      const response = await this.route53.send(command);
      
      if (!response.HostedZones || response.HostedZones.length === 0) {
        return null;
      }

      const zone = response.HostedZones[0];
      
      // Verify exact match (not subdomain)
      if (zone.Name !== `${domain}.` || !zone.Id) {
        return null;
      }

      const zoneId = zone.Id.replace('/hostedzone/', '');

      // Get nameservers
      const zoneCommand = new GetHostedZoneCommand({
        Id: zoneId
      });
      const zoneResponse = await this.route53.send(zoneCommand);
      const nameservers = zoneResponse.DelegationSet?.NameServers || [];

      return {
        zoneId,
        nameservers,
        status: 'INSYNC'
      };
    } catch (error: any) {
      console.error('Error fetching hosted zone:', error.message);
      return null;
    }
  }

  /**
   * Request an ACM SSL certificate for a domain
   */
  async requestCertificate(domain: string): Promise<CertificateInfo> {
    try {
      // Check if certificate already exists
      const existingCert = await this.findCertificate(domain);
      if (existingCert) {
        console.log(`✓ Certificate already exists for ${domain}`);
        return existingCert;
      }

      console.log(`Requesting ACM certificate for ${domain} and www.${domain}...`);

      const command = new RequestCertificateCommand({
        DomainName: domain,
        SubjectAlternativeNames: [`www.${domain}`],
        ValidationMethod: 'DNS',
        Tags: [
          {
            Key: 'Domain',
            Value: domain
          },
          {
            Key: 'Service',
            Value: 'Insurance Agent Website'
          }
        ]
      });

      const response = await this.acm.send(command);
      
      if (!response.CertificateArn) {
        throw new Error('Failed to request certificate - no ARN returned');
      }

      console.log(`✅ Certificate requested: ${response.CertificateArn}`);

      // Get certificate details including DNS validation records
      const certInfo = await this.getCertificateInfo(response.CertificateArn);
      
      return certInfo;
    } catch (error: any) {
      console.error('Error requesting ACM certificate:', error.message);
      throw new Error(`Failed to request certificate: ${error.message}`);
    }
  }

  /**
   * Find existing certificate for a domain
   */
  async findCertificate(domain: string): Promise<CertificateInfo | null> {
    try {
      const command = new ListCertificatesCommand({
        CertificateStatuses: ['PENDING_VALIDATION', 'ISSUED', 'INACTIVE']
      });

      const response = await this.acm.send(command);
      
      if (!response.CertificateSummaryList) {
        return null;
      }

      // Find certificate that matches the domain
      const cert = response.CertificateSummaryList.find(
        c => c.DomainName === domain
      );

      if (!cert || !cert.CertificateArn) {
        return null;
      }

      return await this.getCertificateInfo(cert.CertificateArn);
    } catch (error: any) {
      console.error('Error finding certificate:', error.message);
      return null;
    }
  }

  /**
   * Get detailed certificate information
   */
  async getCertificateInfo(certificateArn: string): Promise<CertificateInfo> {
    try {
      const command = new DescribeCertificateCommand({
        CertificateArn: certificateArn
      });

      const response = await this.acm.send(command);
      
      if (!response.Certificate) {
        throw new Error('Certificate not found');
      }

      const cert = response.Certificate;
      
      // Extract DNS validation records
      const validationRecords = cert.DomainValidationOptions?.map(option => ({
        name: option.ResourceRecord?.Name || '',
        value: option.ResourceRecord?.Value || '',
        type: option.ResourceRecord?.Type || 'CNAME'
      })).filter(record => record.name && record.value) || [];

      return {
        arn: certificateArn,
        status: cert.Status || 'PENDING_VALIDATION',
        domainName: cert.DomainName || '',
        validationRecords
      };
    } catch (error: any) {
      console.error('Error getting certificate info:', error.message);
      throw new Error(`Failed to get certificate info: ${error.message}`);
    }
  }

  /**
   * Create DNS records in Route53
   */
  async createDNSRecord(
    zoneId: string,
    record: DNSRecord
  ): Promise<void> {
    try {
      console.log(`Creating ${record.type} record: ${record.name} → ${record.value}`);

      const command = new ChangeResourceRecordSetsCommand({
        HostedZoneId: zoneId,
        ChangeBatch: {
          Changes: [
            {
              Action: 'UPSERT', // Create or update if exists
              ResourceRecordSet: {
                Name: record.name,
                Type: record.type as any,
                TTL: record.ttl,
                ResourceRecords: [
                  {
                    Value: record.value
                  }
                ]
              }
            }
          ]
        }
      });

      const response = await this.route53.send(command);
      
      console.log(`✅ DNS record created/updated (Change ID: ${response.ChangeInfo?.Id})`);
    } catch (error: any) {
      console.error('Error creating DNS record:', error.message);
      throw new Error(`Failed to create DNS record: ${error.message}`);
    }
  }

  /**
   * Create DNS validation records for ACM certificate
   */
  async createCertificateValidationRecords(
    zoneId: string,
    certificateArn: string
  ): Promise<void> {
    try {
      const certInfo = await this.getCertificateInfo(certificateArn);
      
      if (!certInfo.validationRecords || certInfo.validationRecords.length === 0) {
        throw new Error('No validation records found for certificate');
      }

      console.log(`Creating ${certInfo.validationRecords.length} DNS validation records...`);

      for (const validationRecord of certInfo.validationRecords) {
        await this.createDNSRecord(zoneId, {
          type: validationRecord.type,
          name: validationRecord.name,
          value: validationRecord.value,
          ttl: 300
        });
      }

      console.log(`✅ All validation records created`);
    } catch (error: any) {
      console.error('Error creating validation records:', error.message);
      throw new Error(`Failed to create validation records: ${error.message}`);
    }
  }

  /**
   * Point domain to CloudFront distribution
   */
  async pointDomainToCloudFront(
    zoneId: string,
    domain: string,
    cloudfrontDomain: string
  ): Promise<void> {
    try {
      console.log(`Pointing ${domain} to CloudFront: ${cloudfrontDomain}`);

      // Create A record alias for root domain
      await this.createDNSRecord(zoneId, {
        type: 'CNAME',
        name: domain,
        value: cloudfrontDomain,
        ttl: 300
      });

      // Create A record alias for www subdomain
      await this.createDNSRecord(zoneId, {
        type: 'CNAME',
        name: `www.${domain}`,
        value: cloudfrontDomain,
        ttl: 300
      });

      console.log(`✅ Domain ${domain} pointed to CloudFront`);
    } catch (error: any) {
      console.error('Error pointing domain to CloudFront:', error.message);
      throw new Error(`Failed to point domain to CloudFront: ${error.message}`);
    }
  }

  /**
   * Complete domain setup: Route53 + ACM + CloudFront
   */
  async setupCustomDomain(domain: string, cloudfrontDomain: string): Promise<{
    zoneId: string;
    nameservers: string[];
    certificateArn: string;
    status: string;
  }> {
    try {
      console.log(`\n🚀 Setting up custom domain: ${domain}\n`);

      // Step 1: Create Route53 hosted zone
      console.log('Step 1/4: Creating Route53 hosted zone...');
      const hostedZone = await this.createHostedZone(domain);

      // Step 2: Request ACM certificate
      console.log('\nStep 2/4: Requesting ACM SSL certificate...');
      const certificate = await this.requestCertificate(domain);

      // Step 3: Create DNS validation records
      console.log('\nStep 3/4: Creating DNS validation records...');
      await this.createCertificateValidationRecords(hostedZone.zoneId, certificate.arn);

      // Step 4: Point domain to CloudFront
      console.log('\nStep 4/4: Pointing domain to CloudFront...');
      await this.pointDomainToCloudFront(hostedZone.zoneId, domain, cloudfrontDomain);

      console.log(`\n✅ Custom domain setup complete for ${domain}`);
      console.log(`📋 Next steps:`);
      console.log(`   1. Update nameservers at domain registrar (Namecheap) to:`);
      hostedZone.nameservers.forEach(ns => console.log(`      - ${ns}`));
      console.log(`   2. Wait 5-30 minutes for DNS propagation`);
      console.log(`   3. Wait for ACM certificate validation (usually 5-10 minutes)`);
      console.log(`   4. Add domain to CloudFront distribution aliases`);

      return {
        zoneId: hostedZone.zoneId,
        nameservers: hostedZone.nameservers,
        certificateArn: certificate.arn,
        status: certificate.status
      };
    } catch (error: any) {
      console.error('\n❌ Error setting up custom domain:', error.message);
      throw error;
    }
  }

  /**
   * Check certificate validation status
   */
  async checkCertificateStatus(certificateArn: string): Promise<{
    status: CertificateStatus;
    isValidated: boolean;
    validationRecords: Array<{ name: string; value: string; type: string }>;
  }> {
    try {
      const certInfo = await this.getCertificateInfo(certificateArn);
      
      return {
        status: certInfo.status,
        isValidated: certInfo.status === 'ISSUED',
        validationRecords: certInfo.validationRecords || []
      };
    } catch (error: any) {
      console.error('Error checking certificate status:', error.message);
      throw new Error(`Failed to check certificate status: ${error.message}`);
    }
  }

  /**
   * Get domain status
   */
  async getDomainStatus(domain: string): Promise<{
    hostedZoneExists: boolean;
    nameservers: string[];
    certificateStatus: string;
    isReady: boolean;
  }> {
    try {
      const hostedZone = await this.getHostedZone(domain);
      
      if (!hostedZone) {
        return {
          hostedZoneExists: false,
          nameservers: [],
          certificateStatus: 'NOT_REQUESTED',
          isReady: false
        };
      }

      const certificate = await this.findCertificate(domain);
      const certificateStatus = certificate?.status || 'NOT_REQUESTED';
      const isReady = certificateStatus === 'ISSUED';

      return {
        hostedZoneExists: true,
        nameservers: hostedZone.nameservers,
        certificateStatus,
        isReady
      };
    } catch (error: any) {
      console.error('Error getting domain status:', error.message);
      return {
        hostedZoneExists: false,
        nameservers: [],
        certificateStatus: 'ERROR',
        isReady: false
      };
    }
  }
}

export const awsService = new AWSService();
