// Railway service removed - all Railway integration has been disabled
export const railwayService = {
  isConfigured: () => false,
  addCustomDomain: async () => { throw new Error('Railway service disabled'); },
  removeCustomDomain: async () => { throw new Error('Railway service disabled'); },
  getCustomDomains: async () => { throw new Error('Railway service disabled'); }
};
