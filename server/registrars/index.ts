import { GoDaddyRegistrar } from './godaddy';
import { NamecheapRegistrar } from './namecheap';
import { DomainNameAPIRegistrar } from './domainnameapi';
import type { IRegistrar } from './types';

export type { IRegistrar, DomainSearchResult, DomainRegistrationResult, Registrant } from './types';
export { GoDaddyRegistrar, NamecheapRegistrar, DomainNameAPIRegistrar };

export function getRegistrar(provider: 'godaddy' | 'namecheap' | 'domainnameapi' = 'domainnameapi'): IRegistrar {
  switch (provider) {
    case 'godaddy':
      return new GoDaddyRegistrar(undefined, undefined, false);
    case 'namecheap':
      return new NamecheapRegistrar();
    case 'domainnameapi':
      return new DomainNameAPIRegistrar(undefined, undefined, false);
    default:
      return new DomainNameAPIRegistrar(undefined, undefined, false);
  }
}
