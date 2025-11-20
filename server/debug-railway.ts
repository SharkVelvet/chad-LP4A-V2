import axios from 'axios';

const RAILWAY_API_URL = 'https://backboard.railway.app/graphql/v2';
const RAILWAY_API_TOKEN = process.env.RAILWAY_API_TOKEN;
const RAILWAY_PROJECT_ID = process.env.RAILWAY_PROJECT_ID;
const RAILWAY_SERVICE_ID = process.env.RAILWAY_SERVICE_ID;
const RAILWAY_ENVIRONMENT_ID = process.env.RAILWAY_ENVIRONMENT_ID;

async function debugRailway() {
  console.log('🔍 Railway Configuration Check:');
  console.log(`API Token: ${RAILWAY_API_TOKEN ? '✅ Set' : '❌ Missing'}`);
  console.log(`Project ID: ${RAILWAY_PROJECT_ID ? '✅ Set' : '❌ Missing'}`);
  console.log(`Service ID: ${RAILWAY_SERVICE_ID ? '✅ Set' : '❌ Missing'}`);
  console.log(`Environment ID: ${RAILWAY_ENVIRONMENT_ID ? '✅ Set' : '❌ Missing'}`);
  
  console.log('\n🚂 Testing Railway API Authentication...');
  
  // Test 1: Simple "me" query to verify auth
  const meQuery = `
    query {
      me {
        id
        name
        email
      }
    }
  `;
  
  try {
    const response = await axios.post(
      RAILWAY_API_URL,
      { query: meQuery },
      {
        headers: {
          Authorization: `Bearer ${RAILWAY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (response.data.errors) {
      console.error('❌ Auth test failed:', response.data.errors);
    } else {
      console.log('✅ Authentication working!');
      console.log('User info:', response.data.data.me);
    }
  } catch (error: any) {
    console.error('❌ Auth test error:', error.response?.data || error.message);
  }
  
  // Test 2: Get project info
  console.log('\n🚂 Testing Project Query...');
  const projectQuery = `
    query project($id: String!) {
      project(id: $id) {
        id
        name
        description
      }
    }
  `;
  
  try {
    const response = await axios.post(
      RAILWAY_API_URL,
      { query: projectQuery, variables: { id: RAILWAY_PROJECT_ID } },
      {
        headers: {
          Authorization: `Bearer ${RAILWAY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (response.data.errors) {
      console.error('❌ Project query failed:', response.data.errors);
    } else {
      console.log('✅ Project found!');
      console.log('Project:', response.data.data.project);
    }
  } catch (error: any) {
    console.error('❌ Project query error:', error.response?.data || error.message);
  }
  
  // Test 3: Get service info
  console.log('\n🚂 Testing Service Query...');
  const serviceQuery = `
    query service($id: String!) {
      service(id: $id) {
        id
        name
      }
    }
  `;
  
  try {
    const response = await axios.post(
      RAILWAY_API_URL,
      { query: serviceQuery, variables: { id: RAILWAY_SERVICE_ID } },
      {
        headers: {
          Authorization: `Bearer ${RAILWAY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (response.data.errors) {
      console.error('❌ Service query failed:', response.data.errors);
    } else {
      console.log('✅ Service found!');
      console.log('Service:', response.data.data.service);
    }
  } catch (error: any) {
    console.error('❌ Service query error:', error.response?.data || error.message);
  }
  
  // Test 4: Try to list existing custom domains
  console.log('\n🚂 Testing Custom Domains Query...');
  const domainsQuery = `
    query service($id: String!) {
      service(id: $id) {
        id
        name
        customDomains {
          id
          domain
        }
      }
    }
  `;
  
  try {
    const response = await axios.post(
      RAILWAY_API_URL,
      { query: domainsQuery, variables: { id: RAILWAY_SERVICE_ID } },
      {
        headers: {
          Authorization: `Bearer ${RAILWAY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (response.data.errors) {
      console.error('❌ Custom domains query failed:', response.data.errors);
    } else {
      console.log('✅ Custom domains query successful!');
      console.log('Domains:', response.data.data.service.customDomains);
    }
  } catch (error: any) {
    console.error('❌ Custom domains query error:', error.response?.data || error.message);
  }
}

debugRailway().catch(console.error);
