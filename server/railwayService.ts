/**
 * Railway API Service
 * Handles automatic custom domain registration via Railway GraphQL API
 */

interface RailwayDomainResponse {
  domain: string;
  id: string;
  status?: {
    dnsRecords?: Array<{
      fqdn: string;
      recordType: string;
      requiredValue: string;
      status: string;
    }>;
  };
}

interface RailwayConfig {
  apiToken: string;
  projectId: string;
  serviceId: string;
  environmentId: string;
  serviceEnvironmentId?: string;
}

class RailwayService {
  private apiUrl = 'https://backboard.railway.com/graphql/v2';
  private config: RailwayConfig | null = null;

  /**
   * Initialize Railway service with credentials from environment
   */
  constructor() {
    const apiToken = process.env.RAILWAY_API_TOKEN;
    const projectId = process.env.RAILWAY_PROJECT_ID;
    const serviceId = process.env.RAILWAY_SERVICE_ID;
    const environmentId = process.env.RAILWAY_ENVIRONMENT_ID;

    if (apiToken && projectId && serviceId && environmentId) {
      this.config = {
        apiToken,
        projectId,
        serviceId,
        environmentId,
      };
      console.log('✓ Railway API configured');
    } else {
      console.log('⚠️  Railway API credentials not configured (optional)');
    }
  }

  /**
   * Get the serviceEnvironmentId (required by Railway's new API schema)
   */
  private async getServiceEnvironmentId(): Promise<string> {
    if (!this.config) {
      throw new Error('Railway API not configured');
    }

    // Return cached value if available
    if (this.config.serviceEnvironmentId) {
      return this.config.serviceEnvironmentId;
    }

    console.log('🔍 Fetching serviceEnvironmentId from Railway...');

    // Query to get serviceInstance ID from environment and service
    const query = `
      query environment($id: String!) {
        environment(id: $id) {
          serviceInstances {
            edges {
              node {
                id
                serviceId
              }
            }
          }
        }
      }
    `;

    const variables = {
      id: this.config.environmentId,
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Railway API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`Railway GraphQL error: ${result.errors[0]?.message}`);
    }

    // Get service instances from the environment
    const instances = result.data?.environment?.serviceInstances?.edges || [];
    
    if (instances.length === 0) {
      throw new Error(`No service instances found in environment ${this.config.environmentId}`);
    }
    
    console.log(`📊 Railway returned ${instances.length} service instances`);
    
    // If there's only one service (common case), use it
    // Otherwise, try to find the matching serviceId
    let targetInstance;
    if (instances.length === 1) {
      targetInstance = instances[0];
      console.log(`✓ Using the only service instance: ${targetInstance.node.id}`);
    } else {
      instances.forEach((edge: any, i: number) => {
        console.log(`   Instance ${i}: serviceId=${edge.node.serviceId}, id=${edge.node.id}`);
      });
      console.log(`🔍 Looking for serviceId: ${this.config!.serviceId}`);
      
      targetInstance = instances.find(
        (edge: any) => edge.node.serviceId === this.config!.serviceId
      );

      if (!targetInstance) {
        throw new Error(`Could not find serviceEnvironmentId for service ${this.config.serviceId} in environment ${this.config.environmentId}. Found ${instances.length} instances.`);
      }
    }

    this.config.serviceEnvironmentId = targetInstance.node.id;
    console.log(`✓ Found serviceEnvironmentId: ${this.config.serviceEnvironmentId}`);

    return this.config.serviceEnvironmentId;
  }

  /**
   * Check if Railway API is configured
   */
  isConfigured(): boolean {
    return this.config !== null;
  }

  /**
   * Add a custom domain to Railway service
   * @param domain - The domain to add (e.g., "example.com")
   * @returns Railway domain configuration
   */
  async addCustomDomain(domain: string): Promise<RailwayDomainResponse> {
    if (!this.config) {
      throw new Error('Railway API not configured. Please set RAILWAY_API_TOKEN, RAILWAY_SERVICE_ID, and RAILWAY_ENVIRONMENT_ID environment variables.');
    }

    console.log(`🚂 Adding custom domain to Railway: ${domain}`);

    const mutation = `
      mutation customDomainCreate($input: CustomDomainCreateInput!) {
        customDomainCreate(input: $input) {
          domain
          id
          status {
            dnsRecords {
              fqdn
              recordType
              requiredValue
              status
            }
          }
        }
      }
    `;

    const variables = {
      input: {
        domain,
        projectId: this.config.projectId,
        serviceId: this.config.serviceId,
        environmentId: this.config.environmentId,
      },
    };

    console.log('🔍 Railway mutation input:', JSON.stringify(variables.input, null, 2));

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Railway API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      if (result.errors) {
        // Check if domain already exists error
        const errorMessage = result.errors[0]?.message || 'Unknown error';
        if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
          console.log(`✓ Domain ${domain} already exists in Railway (OK)`);
          return {
            domain,
            id: 'existing',
            status: undefined,
          };
        }
        throw new Error(`Railway GraphQL error: ${errorMessage}`);
      }

      const domainData = result.data.customDomainCreate;
      console.log(`✓ Domain ${domain} added to Railway successfully`);
      
      return domainData;
    } catch (error: any) {
      console.error('Railway API error:', error.message);
      throw error;
    }
  }

  /**
   * Get DNS records for a specific domain
   * @param domain - The domain name
   */
  async getDomainDnsRecords(domain: string): Promise<any[]> {
    if (!this.config) {
      throw new Error('Railway API not configured');
    }

    console.log(`🔍 Fetching DNS records for ${domain} from Railway...`);

    const query = `
      query customDomains($serviceId: String!) {
        customDomains(serviceId: $serviceId) {
          edges {
            node {
              id
              domain
              status {
                dnsRecords {
                  fqdn
                  recordType
                  requiredValue
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      serviceId: this.config.serviceId,
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`Railway API error: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(`Railway GraphQL error: ${result.errors[0]?.message}`);
      }

      // Find the domain in the list
      const domains = result.data?.customDomains?.edges || [];
      const matchingDomain = domains.find((edge: any) => 
        edge.node.domain === domain || edge.node.domain === `www.${domain}`
      );

      if (matchingDomain?.node?.status?.dnsRecords) {
        console.log(`✓ Found ${matchingDomain.node.status.dnsRecords.length} DNS records for ${domain}`);
        return matchingDomain.node.status.dnsRecords;
      }

      console.log(`⚠️  No DNS records found for ${domain} in Railway`);
      return [];
    } catch (error: any) {
      console.error('Error fetching DNS records:', error.message);
      return [];
    }
  }

  /**
   * Get DNS records for domain and www subdomain with retry logic
   * @param domain - The root domain name
   * @param maxRetries - Maximum number of retry attempts (default 3)
   * @param delayMs - Delay between retries in milliseconds (default 5000)
   */
  async getAllDomainDnsRecords(domain: string, maxRetries: number = 3, delayMs: number = 5000): Promise<any[]> {
    if (!this.config) {
      throw new Error('Railway API not configured');
    }

    // Get serviceEnvironmentId (which is actually the serviceInstance ID)
    const serviceEnvironmentId = await this.getServiceEnvironmentId();

    const query = `
      query customDomains($id: String!) {
        serviceInstance(id: $id) {
          customDomains {
            nodes {
              id
              domain
              status {
                dnsRecords {
                  fqdn
                  recordType
                  requiredValue
                  status
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      id: serviceEnvironmentId,
    };

    // Retry loop with exponential backoff
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt}/${maxRetries}: Fetching DNS records for ${domain}...`);

        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Railway API ${response.status} error:`, errorText);
          throw new Error(`Railway API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        if (result.errors) {
          console.error(`Railway GraphQL errors:`, JSON.stringify(result.errors, null, 2));
          throw new Error(`Railway GraphQL error: ${result.errors[0]?.message}`);
        }

        const domains = result.data?.serviceInstance?.customDomains?.nodes || [];

        // Get DNS records for both root and www
        const allRecords: any[] = [];
        for (const customDomain of domains) {
          if (customDomain.domain === domain || customDomain.domain === `www.${domain}`) {
            // Safely check for status and dnsRecords
            if (customDomain.status && 
                Array.isArray(customDomain.status.dnsRecords) && 
                customDomain.status.dnsRecords.length > 0) {
              allRecords.push(...customDomain.status.dnsRecords);
            } else {
              console.log(`   ⚠️  ${customDomain.domain}: status or dnsRecords not available`);
            }
          }
        }

        if (allRecords.length > 0) {
          console.log(`✅ Found ${allRecords.length} DNS records for ${domain}`);
          return allRecords;
        }

        // No records yet - retry if we have attempts left
        if (attempt < maxRetries) {
          console.log(`⏳ No DNS records found yet, waiting ${delayMs / 1000}s before retry...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
        } else {
          console.log(`⚠️  No DNS records found after ${maxRetries} attempts`);
          return [];
        }
      } catch (error: any) {
        console.error(`❌ Error on attempt ${attempt}/${maxRetries}:`, error.message);
        
        // Re-throw on last attempt
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    return [];
  }

  /**
   * Remove a custom domain from Railway service
   * @param domainId - The Railway domain ID
   */
  async removeCustomDomain(domainId: string): Promise<void> {
    if (!this.config) {
      throw new Error('Railway API not configured');
    }

    console.log(`🚂 Removing custom domain from Railway: ${domainId}`);

    const mutation = `
      mutation customDomainDelete($id: String!) {
        customDomainDelete(id: $id)
      }
    `;

    const variables = {
      id: domainId,
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Railway API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`Railway GraphQL error: ${result.errors[0]?.message}`);
    }

    console.log(`✓ Domain removed from Railway successfully`);
  }
}

// Export singleton instance
export const railwayService = new RailwayService();
