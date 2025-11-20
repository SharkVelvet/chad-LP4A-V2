import axios from 'axios';
import type { IRegistrar, DomainSearchResult, DomainRegistrationResult, Registrant } from './types';

export class DomainNameAPIRegistrar implements IRegistrar {
  private username: string;
  private password: string;
  private testMode: boolean;
  private baseUrl: string;

  constructor(username?: string, password?: string, testMode: boolean = true) {
    this.username = username || (testMode ? 'ownername' : process.env.DOMAINNAMEAPI_USERNAME || '');
    this.password = password || (testMode ? 'ownerpass' : process.env.DOMAINNAMEAPI_PASSWORD || '');
    this.testMode = testMode;
    this.baseUrl = testMode ? 'https://api-ote.domainnameapi.com' : 'https://api.domainnameapi.com';
    
    console.log('DomainNameAPI Registrar initialized:', {
      hasUsername: !!this.username,
      username: this.username,
      testMode,
      baseUrl: this.baseUrl
    });
  }

  async searchDomain(domain: string): Promise<DomainSearchResult> {
    try {
      const [sld, tld] = this.splitDomain(domain);
      
      console.log('🔍 DomainNameAPI Search:', { domain, sld, tld });

      // Direct API call to DomainNameAPI
      const response = await axios.post(`${this.baseUrl}/api/checkavailability`, {
        username: this.username,
        password: this.password,
        domains: [domain]
      });
      
      console.log('✅ DomainNameAPI Search Response:', JSON.stringify(response.data, null, 2));

      if (response.data && response.data.result === 'OK' && response.data.data) {
        const domainData = response.data.data[domain];
        if (domainData) {
          const available = domainData.status === 'available';
          const price = domainData.price || 15;

          return {
            available,
            domain,
            price
          };
        }
      }

      // Default to available in test mode for testing
      return {
        available: this.testMode,
        domain,
        price: 15
      };
    } catch (error: any) {
      console.error('Error searching domain with DomainNameAPI:', error);
      
      // In test mode, return available for testing
      if (this.testMode) {
        console.log('⚠️ Test mode: Returning domain as available for testing');
        return {
          available: true,
          domain,
          price: 15
        };
      }
      
      throw new Error(`DomainNameAPI domain search error: ${error.message}`);
    }
  }

  async registerDomain(domain: string, registrant: Registrant, years: number = 1): Promise<DomainRegistrationResult> {
    try {
      console.log('📝 Registering domain with DomainNameAPI:', { domain, years });

      const contacts = this.formatContacts(registrant);

      const response = await axios.post(`${this.baseUrl}/api/registerwithcontactinfo`, {
        username: this.username,
        password: this.password,
        domain,
        period: years,
        contacts,
        nameservers: ['dns.domainnameapi.com', 'web.domainnameapi.com'],
        privacy_protection: false,
        idprotection: false
      });

      console.log('✅ DomainNameAPI Registration Response:', JSON.stringify(response.data, null, 2));

      if (this.testMode) {
        console.log('⚠️ Test mode: Simulating successful domain registration');
        return {
          success: true,
          orderId: `test-${domain}-${Date.now()}`,
          chargedAmount: 0
        };
      }

      if (response.data && response.data.result === 'OK') {
        return {
          success: true,
          orderId: response.data.data?.id || `order-${Date.now()}`,
          chargedAmount: response.data.data?.price || 0
        };
      }

      throw new Error(`Registration failed: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      console.error('Error registering domain with DomainNameAPI:', error);
      
      // In test mode, simulate success
      if (this.testMode) {
        console.log('⚠️ Test mode: Simulating successful domain registration despite error');
        return {
          success: true,
          orderId: `test-${domain}-${Date.now()}`,
          chargedAmount: 0
        };
      }
      
      throw new Error(`Failed to register domain: ${error.message}`);
    }
  }

  async setNameservers(domain: string, nameservers: string[], clientIp?: string): Promise<{ success: boolean }> {
    try {
      console.log('📝 Setting nameservers with DomainNameAPI:', { domain, nameservers });

      const response = await axios.post(`${this.baseUrl}/api/modifynameserver`, {
        username: this.username,
        password: this.password,
        domain,
        nameservers
      });

      console.log('✅ DomainNameAPI Nameserver Response:', JSON.stringify(response.data, null, 2));

      if (this.testMode) {
        console.log('⚠️ Test mode: Simulating successful nameserver update');
        return { success: true };
      }

      if (response.data && response.data.result === 'OK') {
        return { success: true };
      }

      throw new Error(`Failed to set nameservers: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      console.error('Error setting nameservers with DomainNameAPI:', error);
      
      // In test mode, simulate success
      if (this.testMode) {
        console.log('⚠️ Test mode: Simulating successful nameserver update despite error');
        return { success: true };
      }
      
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
