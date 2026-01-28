// Test JDoodle API directly
import axios from 'axios';

const CLIENT_ID = 'be0be62c61de987a7601b220e281a518';
const CLIENT_SECRET = 'db4a27a088c49386cfde280417093924c92d84368bc8c49a61212a0549cee313';

const testCode = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World\!");
    }
}`;

async function testJDoodle() {
  try {
    console.log('Testing JDoodle API...');
    const response = await axios.post(
      'https://api.jdoodle.com/v1/execute',
      {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        script: testCode,
        language: 'java',
        versionIndex: '4'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Success\!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Response:', JSON.stringify(err.response.data, null, 2));
    }
  }
}

testJDoodle();
