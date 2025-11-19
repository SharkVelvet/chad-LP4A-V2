#!/usr/bin/env node

/**
 * Add evhinsurance.com to Railway
 */

const RAILWAY_API_URL = 'https://backboard.railway.com/graphql/v2';
const apiToken = process.env.RAILWAY_API_TOKEN;
const projectId = process.env.RAILWAY_PROJECT_ID;
const serviceId = process.env.RAILWAY_SERVICE_ID;
const environmentId = process.env.RAILWAY_ENVIRONMENT_ID;

if (!apiToken || !projectId || !serviceId || !environmentId) {
  console.error('❌ Railway credentials not configured');
  process.exit(1);
}

async function addDomain(domain) {
  const mutation = `
    mutation customDomainCreate($input: CustomDomainCreateInput!) {
      customDomainCreate(input: $input) {
        domain
        id
        status {
          dnsRecords {
            fqdn
            recordType
            requiredValue
            status
          }
        }
      }
    }
  `;

  const variables = {
    input: {
      domain,
      projectId,
      serviceId,
      environmentId,
    },
  };

  console.log(`🚂 Adding ${domain} to Railway...`);

  try {
    const response = await fetch(RAILWAY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Railway API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    if (result.errors) {
      const errorMessage = result.errors[0]?.message || 'Unknown error';
      if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
        console.log(`✅ ${domain} already exists in Railway (OK)`);
        return { success: true, exists: true };
      }
      throw new Error(`Railway GraphQL error: ${errorMessage}`);
    }

    console.log(`✅ ${domain} added to Railway successfully!`);
    return { success: true, data: result.data.customDomainCreate };
  } catch (error) {
    console.error(`❌ Error adding ${domain}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Add both root and www
async function main() {
  const results = await Promise.all([
    addDomain('evhinsurance.com'),
    addDomain('www.evhinsurance.com'),
  ]);
  
  const allSuccess = results.every(r => r.success);
  
  if (allSuccess) {
    console.log('\n🎉 SUCCESS! Both domains added to Railway!');
    console.log('\n⏰ Wait 30-60 seconds, then visit: https://evhinsurance.com');
    console.log('   Railway needs a moment to configure SSL certificates.');
  } else {
    console.log('\n⚠️  Some domains failed. Check the errors above.');
  }
}

main();
