declare module 'nodejs-dna' {
  class DomainNameAPI {
    constructor(userName?: string, password?: string, testMode?: boolean);
    CheckAvailability(sldList: string[], tldList: string[]): Promise<any>;
    RegisterWithContactInfo(
      domainName: string,
      period: number,
      contacts: any,
      nameServers?: string[],
      eppLock?: boolean,
      privacyLock?: boolean,
      additionalAttributes?: any
    ): Promise<any>;
    ModifyNameServer(domainName: string, nameServers: string[]): Promise<any>;
    GetDetails(domainName: string): Promise<any>;
    GetCurrentBalance(currencyId?: number | string): Promise<any>;
  }
  
  export = DomainNameAPI;
}
