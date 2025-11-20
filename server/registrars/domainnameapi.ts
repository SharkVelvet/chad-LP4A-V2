import DomainNameAPI from 'nodejs-dna';
import type { IRegistrar, DomainSearchResult, DomainRegistrationResult, Registrant } from './types';

export class DomainNameAPIRegistrar implements IRegistrar {
  private client: any;
  private username: string;
  private password: string;

  constructor(username?: string, password?: string, testMode: boolean = true) {
    this.username = username || (testMode ? 'ownername' : process.env.DOMAINNAMEAPI_USERNAME || '');
    this.password = password || (testMode ? 'ownerpass' : process.env.DOMAINNAMEAPI_PASSWORD || '');
    
    this.client = new DomainNameAPI(this.username, this.password, testMode);
    
    console.log('DomainNameAPI Registrar initialized:', {
      hasUsername: !!this.username,
      username: this.username,
      testMode
    });
  }

  async searchDomain(domain: string): Promise<DomainSearchResult> {
    try {
      const [sld, tld] = this.splitDomain(domain);
      
      console.log('🔍 DomainNameAPI Search:', { domain, sld, tld });

      const response = await this.client.CheckAvailability([sld], [tld]);
      
      console.log('✅ DomainNameAPI Search Response:', JSON.stringify(response, null, 2));

      if (response && response.data && response.data.TldList && response.data.TldList.length > 0) {
        const domainResult = response.data.TldList[0];
        const available = domainResult.Status === 'available';
        const price = domainResult.Price || 0;

        return {
          available,
          domain,
          price
        };
      }

      return {
        available: false,
        domain,
        price: 0
      };
    } catch (error: any) {
      console.error('Error searching domain with DomainNameAPI:', error);
      throw new Error(`DomainNameAPI domain search error: ${error.message}`);
    }
  }

  async registerDomain(domain: string, registrant: Registrant, years: number = 1): Promise<DomainRegistrationResult> {
    try {
      console.log('📝 Registering domain with DomainNameAPI:', { domain, years });

      const contacts = this.formatContacts(registrant);
      const nameServers = ['dns.domainnameapi.com', 'web.domainnameapi.com'];

      const response = await this.client.RegisterWithContactInfo(
        domain,
        years,
        contacts,
        nameServers,
        true, // eppLock
        false, // privacyLock
        {}
      );

      console.log('✅ DomainNameAPI Registration Response:', JSON.stringify(response, null, 2));

      if (response && response.result) {
        return {
          success: true,
          orderId: response.data?.ID || 'test-order-id',
          chargedAmount: response.data?.ChargedAmount || 0
        };
      }

      throw new Error(`Registration failed: ${JSON.stringify(response)}`);
    } catch (error: any) {
      console.error('Error registering domain with DomainNameAPI:', error);
      throw new Error(`Failed to register domain: ${error.message}`);
    }
  }

  async setNameservers(domain: string, nameservers: string[], clientIp?: string): Promise<{ success: boolean }> {
    try {
      console.log('📝 Setting nameservers with DomainNameAPI:', { domain, nameservers });

      const response = await this.client.ModifyNameServer(domain, nameservers);

      console.log('✅ DomainNameAPI Nameserver Response:', JSON.stringify(response, null, 2));

      if (response && response.result) {
        return { success: true };
      }

      throw new Error(`Failed to set nameservers: ${JSON.stringify(response)}`);
    } catch (error: any) {
      console.error('Error setting nameservers with DomainNameAPI:', error);
      throw new Error(`Failed to set nameservers: ${error.message}`);
    }
  }

  private splitDomain(domain: string): [string, string] {
    const parts = domain.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid domain format');
    }
    
    // Handle multi-part TLDs (e.g., .co.uk, .com.au)
    // DomainNameAPI expects: sld="example", tld="co.uk" for "example.co.uk"
    const sld = parts[0];
    const tld = parts.slice(1).join('.');
    
    return [sld, tld];
  }

  private formatContacts(registrant: Registrant) {
    const contact = {
      FirstName: registrant.firstName,
      LastName: registrant.lastName,
      Company: '',
      EMail: registrant.email,
      AddressLine1: registrant.address1,
      AddressLine2: registrant.address2 || '',
      AddressLine3: '',
      City: registrant.city,
      State: registrant.stateProvince,
      ZipCode: registrant.postalCode,
      Country: registrant.country,
      Phone: registrant.phone,
      Fax: '',
      Type: 'Contact'
    };

    return {
      Administrative: contact,
      Billing: contact,
      Technical: contact,
      Registrant: contact
    };
  }
}
