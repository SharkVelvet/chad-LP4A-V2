export interface DomainSearchResult {
  available: boolean;
  domain: string;
  price?: number;
}

export interface DomainRegistrationResult {
  success: boolean;
  orderId?: string;
  transactionId?: string;
  chargedAmount?: number;
}

export interface Registrant {
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
  clientIp?: string;
}

export interface IRegistrar {
  searchDomain(domain: string): Promise<DomainSearchResult>;
  registerDomain(domain: string, registrant: Registrant, years?: number): Promise<DomainRegistrationResult>;
  setNameservers(domain: string, nameservers: string[], clientIp?: string): Promise<{ success: boolean }>;
}
