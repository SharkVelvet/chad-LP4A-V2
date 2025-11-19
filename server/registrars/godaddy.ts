import fetch from 'node-fetch';
import { parsePhoneNumber } from 'libphonenumber-js';
import type { IRegistrar, DomainSearchResult, DomainRegistrationResult, Registrant } from './types';

export class GoDaddyRegistrar implements IRegistrar {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;

  constructor(apiKey?: string, apiSecret?: string, useSandbox: boolean = false) {
    this.apiKey = apiKey || process.env.GODADDY_API_KEY || '';
    this.apiSecret = apiSecret || process.env.GODADDY_API_SECRET || '';
    this.baseUrl = useSandbox 
      ? 'https://api.ote-godaddy.com'
      : 'https://api.godaddy.com';
  }

  private getHeaders() {
    return {
      'Authorization': `sso-key ${this.apiKey}:${this.apiSecret}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private formatPhoneNumber(phone: string, country: string): string {
    try {
      const parsed = parsePhoneNumber(phone, country as any);
      
      if (!parsed || !parsed.isValid()) {
        throw new Error(`Invalid phone number for country ${country}: ${phone}. Please provide a valid phone number with country code.`);
      }
      
      const countryCode = parsed.countryCallingCode;
      const nationalNumber = parsed.nationalNumber;
      
      return `+${countryCode}.${nationalNumber}`;
    } catch (error: any) {
      console.error('Error formatting phone number:', error);
      throw new Error(`Phone number validation failed: ${error.message}. Please ensure the phone number includes the country code.`);
    }
  }

  async searchDomain(domain: string): Promise<DomainSearchResult> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/domains/available?domain=${encodeURIComponent(domain)}`,
        {
          method: 'GET',
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`GoDaddy API error: ${error}`);
      }

      const data = await response.json() as any;

      return {
        available: data.available === true,
        domain,
        price: data.price ? data.price / 1000000 : 15.99,
      };
    } catch (error: any) {
      console.error('Error checking domain with GoDaddy:', error);
      throw new Error(`Failed to check domain: ${error.message}`);
    }
  }

  async registerDomain(
    domain: string,
    registrant: Registrant,
    years: number = 1
  ): Promise<DomainRegistrationResult> {
    try {
      const phoneNumber = this.formatPhoneNumber(registrant.phone, registrant.country);
      
      const contact = {
        nameFirst: registrant.firstName,
        nameLast: registrant.lastName,
        email: registrant.email,
        phone: phoneNumber,
        addressMailing: {
          address1: registrant.address1,
          address2: registrant.address2 || '',
          city: registrant.city,
          state: registrant.stateProvince,
          postalCode: registrant.postalCode,
          country: registrant.country,
        },
      };

      const requestBody = {
        domain,
        period: years,
        nameServers: [
          'ns1.cloudflare.com',
          'ns2.cloudflare.com',
        ],
        renewAuto: true,
        privacy: true,
        consent: {
          agreedBy: registrant.clientIp || registrant.email,
          agreedAt: new Date().toISOString(),
          agreementKeys: ['DNRA'],
        },
        contactAdmin: contact,
        contactBilling: contact,
        contactRegistrant: contact,
        contactTech: contact,
      };

      const response = await fetch(
        `${this.baseUrl}/v1/domains/purchase`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`GoDaddy registration error: ${error}`);
      }

      const data = await response.json() as any;

      return {
        success: true,
        orderId: data.orderId?.toString(),
        transactionId: data.itemId?.toString(),
        chargedAmount: data.total ? data.total / 1000000 : 0,
      };
    } catch (error: any) {
      console.error('Error registering domain with GoDaddy:', error);
      throw new Error(`Failed to register domain: ${error.message}`);
    }
  }

  async setNameservers(
    domain: string,
    nameservers: string[],
    clientIp?: string
  ): Promise<{ success: boolean }> {
    try {
      const requestBody = {
        nameServers: nameservers,
        consent: {
          agreedBy: clientIp || '127.0.0.1',
          agreedAt: new Date().toISOString(),
          agreementKeys: ['DNRA'],
        },
      };

      const response = await fetch(
        `${this.baseUrl}/v1/domains/${domain}`,
        {
          method: 'PATCH',
          headers: this.getHeaders(),
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`GoDaddy nameserver error: ${error}`);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error setting nameservers with GoDaddy:', error);
      throw new Error(`Failed to set nameservers: ${error.message}`);
    }
  }
}
