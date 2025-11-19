import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const NAMECHEAP_API_URL = 'https://api.namecheap.com/xml.response';
const API_USER = process.env.NAMECHEAP_API_USER!;
const API_KEY = process.env.NAMECHEAP_API_KEY!;
const USERNAME = process.env.NAMECHEAP_USERNAME!;
const CLIENT_IP = process.env.NAMECHEAP_CLIENT_IP!;

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

export async function checkDomainAvailability(domain: string): Promise<{
  available: boolean;
  domain: string;
  price?: number;
}> {
  try {
    const params = new URLSearchParams({
      ApiUser: API_USER,
      ApiKey: API_KEY,
      UserName: USERNAME,
      ClientIp: CLIENT_IP,
      Command: 'namecheap.domains.check',
      DomainList: domain,
    });

    const response = await axios.get(`${NAMECHEAP_API_URL}?${params.toString()}`);
    const parsed: NamecheapResponse = parser.parse(response.data);

    if (parsed.ApiResponse['@_Status'] !== 'OK') {
      const error = parsed.ApiResponse.Errors?.Error;
      console.log('Namecheap API error object:', JSON.stringify(error, null, 2));
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
    console.error('Error checking domain availability:', error);
    throw new Error(`Failed to check domain: ${error.message}`);
  }
}

export async function registerDomain(
  domain: string,
  registrant: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address1: string;
    address2?: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  },
  cloudflareNameservers: string[]
): Promise<{
  success: boolean;
  orderId?: number;
  transactionId?: number;
  chargedAmount?: number;
}> {
  try {
    const params = new URLSearchParams({
      ApiUser: API_USER,
      ApiKey: API_KEY,
      UserName: USERNAME,
      ClientIp: CLIENT_IP,
      Command: 'namecheap.domains.create',
      DomainName: domain,
      Years: '1',
      
      RegistrantFirstName: registrant.firstName,
      RegistrantLastName: registrant.lastName,
      RegistrantAddress1: registrant.address1,
      RegistrantAddress2: registrant.address2 || '',
      RegistrantCity: registrant.city,
      RegistrantStateProvince: registrant.stateProvince,
      RegistrantPostalCode: registrant.postalCode,
      RegistrantCountry: registrant.country,
      RegistrantPhone: registrant.phone,
      RegistrantEmailAddress: registrant.email,
      
      TechFirstName: registrant.firstName,
      TechLastName: registrant.lastName,
      TechAddress1: registrant.address1,
      TechAddress2: registrant.address2 || '',
      TechCity: registrant.city,
      TechStateProvince: registrant.stateProvince,
      TechPostalCode: registrant.postalCode,
      TechCountry: registrant.country,
      TechPhone: registrant.phone,
      TechEmailAddress: registrant.email,
      
      AdminFirstName: registrant.firstName,
      AdminLastName: registrant.lastName,
      AdminAddress1: registrant.address1,
      AdminAddress2: registrant.address2 || '',
      AdminCity: registrant.city,
      AdminStateProvince: registrant.stateProvince,
      AdminPostalCode: registrant.postalCode,
      AdminCountry: registrant.country,
      AdminPhone: registrant.phone,
      AdminEmailAddress: registrant.email,
      
      AuxBillingFirstName: registrant.firstName,
      AuxBillingLastName: registrant.lastName,
      AuxBillingAddress1: registrant.address1,
      AuxBillingAddress2: registrant.address2 || '',
      AuxBillingCity: registrant.city,
      AuxBillingStateProvince: registrant.stateProvince,
      AuxBillingPostalCode: registrant.postalCode,
      AuxBillingCountry: registrant.country,
      AuxBillingPhone: registrant.phone,
      AuxBillingEmailAddress: registrant.email,
      
      Nameservers: cloudflareNameservers.join(','),
      AddFreeWhoisguard: 'yes',
      WGEnabled: 'yes',
    });

    const response = await axios.post(NAMECHEAP_API_URL, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const parsed: NamecheapResponse = parser.parse(response.data);

    if (parsed.ApiResponse['@_Status'] !== 'OK') {
      const error = parsed.ApiResponse.Errors?.Error;
      const errorMsg = Array.isArray(error) ? error[0]['#text'] : error;
      throw new Error(`Namecheap registration error: ${errorMsg}`);
    }

    const domainCreateResult = parsed.ApiResponse.CommandResponse?.DomainCreateResult;

    return {
      success: true,
      orderId: domainCreateResult?.['@_OrderID'],
      transactionId: domainCreateResult?.['@_TransactionID'],
      chargedAmount: parseFloat(domainCreateResult?.['@_ChargedAmount'] || '0'),
    };
  } catch (error: any) {
    console.error('Error registering domain:', error);
    throw new Error(`Failed to register domain: ${error.message}`);
  }
}

export async function setNameservers(
  domain: string,
  nameservers: string[]
): Promise<{ success: boolean }> {
  try {
    const [sld, tld] = domain.split('.');

    const params = new URLSearchParams({
      ApiUser: API_USER,
      ApiKey: API_KEY,
      UserName: USERNAME,
      ClientIp: CLIENT_IP,
      Command: 'namecheap.domains.dns.setCustom',
      SLD: sld,
      TLD: tld,
      Nameservers: nameservers.join(','),
    });

    const response = await axios.post(NAMECHEAP_API_URL, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const parsed: NamecheapResponse = parser.parse(response.data);

    if (parsed.ApiResponse['@_Status'] !== 'OK') {
      const error = parsed.ApiResponse.Errors?.Error;
      const errorMsg = Array.isArray(error) ? error[0]['#text'] : error;
      throw new Error(`Namecheap setNameservers error: ${errorMsg}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error setting nameservers:', error);
    throw new Error(`Failed to set nameservers: ${error.message}`);
  }
}
