// Domain service removed - all domain management functionality has been disabled
export const domainService = {
  checkAvailability: async () => { throw new Error('Domain service disabled'); },
  getPricing: async () => { throw new Error('Domain service disabled'); },
  purchaseDomain: async () => { throw new Error('Domain service disabled'); },
  setDnsRecords: async () => { throw new Error('Domain service disabled'); },
  setDefaultNameservers: async () => { throw new Error('Domain service disabled'); },
  getDomainInfo: async () => { throw new Error('Domain service disabled'); },
  addMxRecord: async () => { throw new Error('Domain service disabled'); }
};
