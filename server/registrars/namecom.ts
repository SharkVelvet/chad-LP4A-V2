import axios from 'axios';
import type { IRegistrar, DomainSearchResult, DomainRegistrationResult, Registrant } from './types';

export class NameComRegistrar implements IRegistrar {
  private username: string;
  private apiToken: string;
  private baseUrl: string;

  constructor(username?: string, apiToken?: string, useProduction: boolean = true) {
    this.username = username || process.env.NAMECOM_USERNAME || '';
    this.apiToken = apiToken || process.env.NAMECOM_API_TOKEN || '';
    this.baseUrl = useProduction ? 'https://api.name.com' : 'https://api.dev.name.com';
    
    console.log('Name.com Registrar initialized:', {
      hasUsername: !!this.username,
      hasToken: !!this.apiToken,
      baseUrl: this.baseUrl
    });
  }

  private getAuthHeader() {
    const credentials = Buffer.from(`${this.username}:${this.apiToken}`).toString('base64');
    return `Basic ${credentials}`;
  }

  async searchDomain(domain: string): Promise<DomainSearchResult> {
    try {
      console.log('🔍 Name.com Search:', { domain });

      const response = await axios.post(`${this.baseUrl}/v4/domains:checkAvailability`, {
        domainNames: [domain]
      }, {
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ Name.com Search Response:', JSON.stringify(response.data, null, 2));

      if (response.data && response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        const available = result.purchasable === true;
        const price = result.purchasePrice || 15;

        return {
          available,
          domain,
          price
        };
      }

      throw new Error(`Invalid response from Name.com: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      console.error('Error searching domain with Name.com:', error.response?.data || error.message);
      throw new Error(`Name.com domain search error: ${error.message}`);
    }
  }

  async registerDomain(domain: string, registrant: Registrant, years: number = 1): Promise<DomainRegistrationResult> {
    try {
      console.log('📝 Registering domain with Name.com:', { domain, years });

      const contacts = this.formatContact(registrant);

      const response = await axios.post(`${this.baseUrl}/core/v1/domains`, {
        domain: {
          domainName: domain,
        },
        purchasePrice: 0, // Let Name.com calculate the price
        years,
        tldRequirements: [],
        contacts
      }, {
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Name.com Registration Response:', JSON.stringify(response.data, null, 2));

      if (response.data && response.data.domain) {
        return {
          success: true,
          orderId: response.data.domain.domainName || `order-${Date.now()}`,
          chargedAmount: response.data.domain.purchasePrice || 0
        };
      }

      throw new Error(`Registration failed: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      console.error('Error registering domain with Name.com:', error.response?.data || error.message);
      throw new Error(`Failed to register domain: ${error.response?.data?.message || error.message}`);
    }
  }

  async setNameservers(domain: string, nameservers: string[], clientIp?: string): Promise<{ success: boolean }> {
    try {
      console.log('📝 Setting nameservers with Name.com:', { domain, nameservers });

      const response = await axios.post(`${this.baseUrl}/v4/domains/${domain}:setNameservers`, {
        nameservers
      }, {
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Name.com Nameserver Response:', JSON.stringify(response.data, null, 2));

      if (response.data) {
        return { success: true };
      }

      throw new Error(`Failed to set nameservers: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      console.error('Error setting nameservers with Name.com:', error.response?.data || error.message);
      throw new Error(`Failed to set nameservers: ${error.response?.data?.message || error.message}`);
    }
  }

  private formatContact(registrant: Registrant) {
    const contact = {
      firstName: registrant.firstName,
      lastName: registrant.lastName,
      companyName: '',
      address1: registrant.address1,
      address2: registrant.address2 || '',
      city: registrant.city,
      state: registrant.stateProvince,
      zip: registrant.postalCode,
      country: registrant.country,
      phone: registrant.phone,
      email: registrant.email
    };

    return {
      admin: contact,
      billing: contact,
      registrant: contact,
      tech: contact
    };
  }
}
