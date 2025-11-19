import { GoDaddyRegistrar } from './godaddy';
import { NamecheapRegistrar } from './namecheap';
import type { IRegistrar } from './types';

export type { IRegistrar, DomainSearchResult, DomainRegistrationResult, Registrant } from './types';
export { GoDaddyRegistrar, NamecheapRegistrar };

export function getRegistrar(provider: 'godaddy' | 'namecheap' = 'godaddy'): IRegistrar {
  switch (provider) {
    case 'godaddy':
      return new GoDaddyRegistrar(undefined, undefined, false);
    case 'namecheap':
      return new NamecheapRegistrar();
    default:
      return new GoDaddyRegistrar(undefined, undefined, false);
  }
}
