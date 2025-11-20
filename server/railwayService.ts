import axios from 'axios';

const RAILWAY_API_URL = 'https://backboard.railway.app/graphql/v2';
const RAILWAY_API_TOKEN = process.env.RAILWAY_API_TOKEN;
const RAILWAY_PROJECT_ID = process.env.RAILWAY_PROJECT_ID;
const RAILWAY_SERVICE_ID = process.env.RAILWAY_SERVICE_ID;
const RAILWAY_ENVIRONMENT_ID = process.env.RAILWAY_ENVIRONMENT_ID;

interface RailwayCustomDomain {
  id: string;
  domain: string;
  status: string;
}

export const railwayService = {
  isConfigured: () => {
    return !!(RAILWAY_API_TOKEN && RAILWAY_PROJECT_ID && RAILWAY_SERVICE_ID && RAILWAY_ENVIRONMENT_ID);
  },

  async addCustomDomain(domain: string): Promise<RailwayCustomDomain> {
    if (!railwayService.isConfigured()) {
      throw new Error('Railway service is not properly configured');
    }

    const mutation = `
      mutation customDomainCreate($input: CustomDomainCreateInput!) {
        customDomainCreate(input: $input) {
          id
          domain
          status {
            dnsRecords {
              requiredType
              requiredValue
              currentValue
              status
            }
            cdnStatus
          }
        }
      }
    `;

    const variables = {
      input: {
        domain,
        environmentId: RAILWAY_ENVIRONMENT_ID,
        serviceId: RAILWAY_SERVICE_ID,
      },
    };

    try {
      console.log(`🚂 Adding custom domain ${domain} to Railway...`);
      
      const response = await axios.post(
        RAILWAY_API_URL,
        { query: mutation, variables },
        {
          headers: {
            Authorization: `Bearer ${RAILWAY_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.errors) {
        console.error('Railway API errors:', response.data.errors);
        throw new Error(`Railway API error: ${response.data.errors[0]?.message || 'Unknown error'}`);
      }

      const customDomain = response.data.data.customDomainCreate;
      console.log(`✅ Custom domain added to Railway:`, customDomain);

      return {
        id: customDomain.id,
        domain: customDomain.domain,
        status: customDomain.status?.cdnStatus || 'pending',
      };
    } catch (error: any) {
      console.error('Error adding custom domain to Railway:', error.response?.data || error.message);
      throw new Error(`Failed to add custom domain: ${error.message}`);
    }
  },

  async removeCustomDomain(customDomainId: string): Promise<boolean> {
    if (!railwayService.isConfigured()) {
      throw new Error('Railway service is not properly configured');
    }

    const mutation = `
      mutation customDomainDelete($id: String!) {
        customDomainDelete(id: $id)
      }
    `;

    const variables = { id: customDomainId };

    try {
      console.log(`🚂 Removing custom domain ${customDomainId} from Railway...`);
      
      const response = await axios.post(
        RAILWAY_API_URL,
        { query: mutation, variables },
        {
          headers: {
            Authorization: `Bearer ${RAILWAY_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.errors) {
        throw new Error(`Railway API error: ${response.data.errors[0]?.message || 'Unknown error'}`);
      }

      console.log(`✅ Custom domain removed from Railway`);
      return true;
    } catch (error: any) {
      console.error('Error removing custom domain from Railway:', error.response?.data || error.message);
      throw new Error(`Failed to remove custom domain: ${error.message}`);
    }
  },

  async getCustomDomains(): Promise<RailwayCustomDomain[]> {
    if (!railwayService.isConfigured()) {
      throw new Error('Railway service is not properly configured');
    }

    const query = `
      query service($id: String!) {
        service(id: $id) {
          customDomains {
            id
            domain
            status {
              cdnStatus
            }
          }
        }
      }
    `;

    const variables = { id: RAILWAY_SERVICE_ID };

    try {
      const response = await axios.post(
        RAILWAY_API_URL,
        { query, variables },
        {
          headers: {
            Authorization: `Bearer ${RAILWAY_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.errors) {
        throw new Error(`Railway API error: ${response.data.errors[0]?.message || 'Unknown error'}`);
      }

      const domains = response.data.data.service.customDomains || [];
      return domains.map((d: any) => ({
        id: d.id,
        domain: d.domain,
        status: d.status?.cdnStatus || 'unknown',
      }));
    } catch (error: any) {
      console.error('Error fetching custom domains from Railway:', error.response?.data || error.message);
      throw new Error(`Failed to fetch custom domains: ${error.message}`);
    }
  },
};
