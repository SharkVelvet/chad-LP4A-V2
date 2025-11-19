// Cloudflare service removed - all Cloudflare integration has been disabled
export const cloudflareService = {
  addCustomHostname: async () => { throw new Error('Cloudflare service disabled'); },
  removeCustomHostname: async () => { throw new Error('Cloudflare service disabled'); },
  getCustomHostname: async () => { throw new Error('Cloudflare service disabled'); }
};
