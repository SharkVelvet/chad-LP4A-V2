import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import type { IRegistrar, DomainSearchResult, DomainRegistrationResult, Registrant } from './types';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

interface NamecheapResponse {
  ApiResponse: {
    '@_Status': string;
    Errors?: {
      Error: string | Array<{ '#text': string }>;
    };
    CommandResponse?: any;
  };
}

export class NamecheapRegistrar implements IRegistrar {
  private apiUser: string;
  private apiKey: string;
  private username: string;
  private clientIp: string;
  private apiUrl: string = 'https://api.namecheap.com/xml.response';

  constructor(
    apiUser?: string,
    apiKey?: string,
    username?: string,
    clientIp?: string
  ) {
    this.apiUser = apiUser || process.env.NAMECHEAP_API_USER || '';
    this.apiKey = apiKey || process.env.NAMECHEAP_API_KEY || '';
    this.username = username || process.env.NAMECHEAP_USERNAME || '';
    this.clientIp = clientIp || process.env.NAMECHEAP_CLIENT_IP || '';
  }

  async searchDomain(domain: string): Promise<DomainSearchResult> {
    try {
      const params = new URLSearchParams({
        ApiUser: this.apiUser,
        ApiKey: this.apiKey,
        UserName: this.username,
        ClientIp: this.clientIp,
        Command: 'namecheap.domains.check',
        DomainList: domain,
      });

      const response = await axios.get(`${this.apiUrl}?${params.toString()}`);
      const parsed: NamecheapResponse = parser.parse(response.data);

      if (parsed.ApiResponse['@_Status'] !== 'OK') {
        const error = parsed.ApiResponse.Errors?.Error;
        console.log('Namecheap API error:', JSON.stringify(error, null, 2));
        const errorMsg = Array.isArray(error) ? error[0]['#text'] : error;
        throw new Error(`Namecheap API error: ${JSON.stringify(errorMsg)}`);
      }

      const domainCheck = parsed.ApiResponse.CommandResponse?.DomainCheckResult;
      const available = domainCheck?.['@_Available'] === 'true';

      return {
        available,
        domain,
        price: available ? 15.88 : undefined,
      };
    } catch (error: any) {
      console.error('Error checking domain with Namecheap:', error);
      throw new Error(`Failed to check domain: ${error.message}`);
    }
  }

  async registerDomain(
    domain: string,
    registrant: Registrant,
    years: number = 1
  ): Promise<DomainRegistrationResult> {
    throw new Error('Namecheap registration requires IP whitelisting - use GoDaddy instead');
  }

  async setNameservers(
    domain: string,
    nameservers: string[]
  ): Promise<{ success: boolean }> {
    throw new Error('Namecheap nameserver updates require IP whitelisting - use GoDaddy instead');
  }
}
