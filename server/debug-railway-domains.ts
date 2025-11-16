import { railwayService } from './railwayService.js';

async function debugRailwayDomains() {
  console.log('🔍 Debugging Railway domains...\n');
  
  try {
    // Get all domains in the service
    console.log('Fetching all domains from Railway...');
    const query = `
      query GetServiceDomains($serviceId: String!, $environmentId: String!) {
        service(id: $serviceId) {
          id
          name
          domains(environmentId: $environmentId) {
            customDomains {
              id
              domain
              status {
                dnsRecords {
                  fqdn
                  requiredValue
                  type
                  status
                }
              }
            }
          }
        }
      }
    `;
    
    const variables = {
      serviceId: process.env.RAILWAY_SERVICE_ID,
      environmentId: process.env.RAILWAY_ENVIRONMENT_ID
    };
    
    const response = await fetch('https://backboard.railway.app/graphql/v2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RAILWAY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    
    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL errors:', JSON.stringify(result.errors, null, 2));
    } else {
      console.log('✅ Success! Domains in Railway:\n');
      const domains = result.data?.service?.domains?.customDomains || [];
      
      if (domains.length === 0) {
        console.log('   No custom domains found');
      } else {
        domains.forEach((domain: any, i: number) => {
          console.log(`${i + 1}. ${domain.domain}`);
          if (domain.status?.dnsRecords && domain.status.dnsRecords.length > 0) {
            console.log(`   DNS Records:`);
            domain.status.dnsRecords.forEach((record: any) => {
              console.log(`   - ${record.fqdn} → ${record.requiredValue} (${record.type})`);
            });
          } else {
            console.log(`   ⚠️  No DNS records returned`);
          }
          console.log('');
        });
      }
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

debugRailwayDomains();
