// Caddy service removed - all Caddy integration has been disabled
export async function addDomainToAllowlist(domain: string) {
  throw new Error('Caddy service disabled');
}

export async function removeDomainFromAllowlist(domain: string) {
  throw new Error('Caddy service disabled');
}

export async function checkCaddyHealth() {
  return false;
}
