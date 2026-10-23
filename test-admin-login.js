const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const mongoose = require('mongoose');
const { connectDB } = require('./backend/src/config/db');
const { handler } = require('./netlify/functions/api');

async function simulateNetlifyRequest(httpMethod, path, body = null, headers = {}) {
  const event = {
    httpMethod,
    path,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    queryStringParameters: {},
  };
  const context = {
    callbackWaitsForEmptyEventLoop: true,
  };
  return await handler(event, context);
}

async function runTestSuite() {
  console.log('====================================================');
  console.log(' NETLIFY SERVERLESS & AUTHENTICATION TEST SUITE    ');
  console.log('====================================================\n');

  console.log('1. Connecting to Database & verifying seeding hook...');
  await connectDB();
  console.log('✓ Database connected and ensureInitialData() triggered.\n');

  console.log('2. Testing Serverless Health Endpoints:');
  
  // Test health check via /.netlify/functions/api
  const healthRes1 = await simulateNetlifyRequest('GET', '/.netlify/functions/api');
  console.log('GET /.netlify/functions/api -> Status:', healthRes1.statusCode, JSON.parse(healthRes1.body || '{}').service);
  if (healthRes1.statusCode !== 200) {
    console.error('Failed GET /.netlify/functions/api');
    process.exit(1);
  }

  // Test health check via /.netlify/functions/api/health
  const healthRes2 = await simulateNetlifyRequest('GET', '/.netlify/functions/api/health');
  console.log('GET /.netlify/functions/api/health -> Status:', healthRes2.statusCode, JSON.parse(healthRes2.body || '{}').status);
  if (healthRes2.statusCode !== 200) {
    console.error('Failed GET /.netlify/functions/api/health');
    process.exit(1);
  }

  console.log('\n3. Testing CORS OPTIONS Preflight:');
  const corsRes = await simulateNetlifyRequest('OPTIONS', '/.netlify/functions/api/auth/login');
  console.log('OPTIONS /.netlify/functions/api/auth/login -> Status:', corsRes.statusCode);
  if (corsRes.statusCode !== 204 && corsRes.statusCode !== 200) {
    console.error('Failed CORS OPTIONS preflight');
    process.exit(1);
  }

  console.log('\n4. Testing Authentication Flow:');
  const testCases = [
    {
      name: 'Standard Email Login (admin@gandrareddy.in)',
      payload: { email: 'admin@gandrareddy.in', password: 'Admin@12345' },
      expectedStatus: 200,
    },
    {
      name: 'Username Shorthand Login ("admin")',
      payload: { email: 'admin', password: 'Admin@12345' },
      expectedStatus: 200,
    },
    {
      name: 'Superadmin Shorthand Login ("superadmin")',
      payload: { email: 'superadmin', password: 'Admin@12345' },
      expectedStatus: 200,
    },
    {
      name: 'Credentials with whitespace (" admin@gandrareddy.in ")',
      payload: { email: '  admin@gandrareddy.in  ', password: ' Admin@12345 ' },
      expectedStatus: 200,
    },
    {
      name: 'Case-Insensitive Email ("ADMIN@GANDRAREDDY.IN")',
      payload: { email: 'ADMIN@GANDRAREDDY.IN', password: 'Admin@12345' },
      expectedStatus: 200,
    },
    {
      name: 'Incorrect Password Rejection',
      payload: { email: 'admin@gandrareddy.in', password: 'IncorrectPassword!#$' },
      expectedStatus: 401,
    },
    {
      name: 'Unknown User Rejection',
      payload: { email: 'nonexistent_person_xyz@random.com', password: 'Admin@12345' },
      expectedStatus: 401,
    },
  ];

  let testToken = null;

  for (const tc of testCases) {
    process.stdout.write(`Testing: ${tc.name}... `);
    const res = await simulateNetlifyRequest('POST', '/.netlify/functions/api/auth/login', tc.payload);
    const parsedBody = JSON.parse(res.body || '{}');

    if (res.statusCode === tc.expectedStatus) {
      console.log(`PASSED (HTTP ${res.statusCode})`);
      if (parsedBody.token) {
        testToken = parsedBody.token;
      }
    } else {
      console.error(`FAILED! Expected ${tc.expectedStatus}, got ${res.statusCode}:`, parsedBody);
      process.exit(1);
    }
  }

  console.log('\n5. Testing Protected Endpoints with Generated JWT Token:');
  const meRes = await simulateNetlifyRequest('GET', '/.netlify/functions/api/auth/me', null, {
    authorization: `Bearer ${testToken}`,
  });
  const meBody = JSON.parse(meRes.body || '{}');
  if (meRes.statusCode === 200 && meBody.user?.email) {
    console.log(`✓ /api/auth/me authenticated as: ${meBody.user.email} (${meBody.user.role})`);
  } else {
    console.error('FAILED /api/auth/me:', meRes.statusCode, meBody);
    process.exit(1);
  }

  // Test updating educational qualifications or profile via Netlify function
  const profRes = await simulateNetlifyRequest('GET', '/.netlify/functions/api/profile');
  const profBody = JSON.parse(profRes.body || '{}');
  if (profRes.statusCode === 200 && profBody.data?.fullName?.en) {
    console.log(`✓ /api/profile loaded: ${profBody.data.fullName.en} (${profBody.data.fullName.te})`);
  } else {
    console.error('FAILED /api/profile:', profRes.statusCode, profBody);
    process.exit(1);
  }

  console.log('\n====================================================');
  console.log('   ALL NETLIFY SERVERLESS TESTS PASSED (100%)       ');
  console.log('====================================================\n');
  process.exit(0);
}

runTestSuite().catch((err) => {
  console.error('Unhandled test failure:', err);
  process.exit(1);
});
