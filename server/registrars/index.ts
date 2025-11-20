import { GoDaddyRegistrar } from './godaddy';
import { NamecheapRegistrar } from './namecheap';
import { DomainNameAPIRegistrar } from './domainnameapi';
import { NameComRegistrar } from './namecom';
import type { IRegistrar } from './types';

export type { IRegistrar, DomainSearchResult, DomainRegistrationResult, Registrant } from './types';
export { GoDaddyRegistrar, NamecheapRegistrar, DomainNameAPIRegistrar, NameComRegistrar };

export function getRegistrar(provider: 'godaddy' | 'namecheap' | 'domainnameapi' | 'namecom' = 'namecom'): IRegistrar {
  switch (provider) {
    case 'godaddy':
      return new GoDaddyRegistrar(undefined, undefined, false);
    case 'namecheap':
      return new NamecheapRegistrar();
    case 'domainnameapi':
      return new DomainNameAPIRegistrar(undefined, undefined, false);
    case 'namecom':
      return new NameComRegistrar(undefined, undefined, false);
    default:
      return new NameComRegistrar(undefined, undefined, false);
  }
}
