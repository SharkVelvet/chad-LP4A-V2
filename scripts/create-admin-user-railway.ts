import pkg from 'pg';
const { Client } = pkg;
import bcrypt from 'bcryptjs';

const DATABASE_URL = "postgresql://postgres:BzmJNrqXbgFEXdWFBLSqvLQMzRcCNfIS@autorack.proxy.rlwy.net:39917/railway";

async function createAdminUser() {
  console.log('🔧 Creating admin user on Railway...\n');
  
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✓ Connected to Railway database\n');

    // Check if user already exists
    const checkUser = await client.query(
      'SELECT id, username, email FROM users WHERE email = $1',
      ['chad@fotype.com']
    );

    if (checkUser.rows.length > 0) {
      console.log('✓ Admin user already exists:');
      console.log(`  Username: ${checkUser.rows[0].username}`);
      console.log(`  Email: ${checkUser.rows[0].email}`);
      console.log('\n📝 Login credentials:');
      console.log('  Username: testtwo');
      console.log('  Password: password');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('password', 10);

    // Create admin user
    const result = await client.query(
      `INSERT INTO users (username, email, password, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, username, email, role`,
      ['testtwo', 'chad@fotype.com', hashedPassword, 'admin']
    );

    console.log('✅ Admin user created successfully!\n');
    console.log('User details:');
    console.log(`  ID: ${result.rows[0].id}`);
    console.log(`  Username: ${result.rows[0].username}`);
    console.log(`  Email: ${result.rows[0].email}`);
    console.log(`  Role: ${result.rows[0].role}`);
    console.log('\n📝 Login credentials:');
    console.log('  URL: https://chad-lp4a-v2-production.up.railway.app/login');
    console.log('  Username: testtwo');
    console.log('  Password: password');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

createAdminUser();
