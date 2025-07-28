/**
 * Heroku Debug Script
 * 
 * This script helps diagnose common issues with Heroku deployments
 * Run with: node heroku-debug.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const https = require('https');

// ANSI color codes for better readability
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.cyan}=== MozTrack Heroku Deployment Diagnostic Tool ===${colors.reset}\n`);

// Check environment variables
const checkEnvironmentVariables = () => {
  console.log(`${colors.magenta}Checking environment variables...${colors.reset}`);
  
  const requiredVars = ['MONGO_URI', 'JWT_SECRET', 'PORT'];
  const recommendedVars = ['NODE_ENV', 'FRONTEND_URL'];
  
  let missingRequired = [];
  let missingRecommended = [];
  
  requiredVars.forEach(variable => {
    if (!process.env[variable]) {
      missingRequired.push(variable);
    } else {
      console.log(`${colors.green}✓${colors.reset} ${variable} is set`);
    }
  });
  
  recommendedVars.forEach(variable => {
    if (!process.env[variable]) {
      missingRecommended.push(variable);
    } else {
      console.log(`${colors.green}✓${colors.reset} ${variable} is set`);
    }
  });
  
  if (missingRequired.length > 0) {
    console.log(`${colors.red}✗ Missing required environment variables: ${missingRequired.join(', ')}${colors.reset}`);
  }
  
  if (missingRecommended.length > 0) {
    console.log(`${colors.yellow}⚠ Missing recommended environment variables: ${missingRecommended.join(', ')}${colors.reset}`);
  }
  
  // Check NODE_ENV specifically
  if (process.env.NODE_ENV) {
    console.log(`${colors.blue}ℹ NODE_ENV is set to: ${process.env.NODE_ENV}${colors.reset}`);
  }
  
  return missingRequired.length === 0;
};

// Test MongoDB connection
const testMongoDBConnection = async () => {
  console.log(`\n${colors.magenta}Testing MongoDB connection...${colors.reset}`);
  
  if (!process.env.MONGO_URI) {
    console.log(`${colors.red}✗ Cannot test MongoDB connection: MONGO_URI is not set${colors.reset}`);
    return false;
  }
  
  try {
    console.log(`${colors.blue}ℹ Attempting to connect to: ${process.env.MONGO_URI.replace(/\/\/([^:]+):[^@]+@/, '//\\1:****@')}${colors.reset}`);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    
    console.log(`${colors.green}✓ Successfully connected to MongoDB at ${conn.connection.host}${colors.reset}`);
    await mongoose.connection.close();
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ Failed to connect to MongoDB: ${error.message}${colors.reset}`);
    console.log(`${colors.yellow}⚠ Common issues:${colors.reset}`);
    console.log(`  - Network connectivity issues`);
    console.log(`  - IP address not whitelisted in MongoDB Atlas`);
    console.log(`  - Incorrect username/password`);
    console.log(`  - Invalid connection string format`);
    return false;
  }
};

// Test frontend connectivity
const testFrontendConnectivity = async () => {
  console.log(`\n${colors.magenta}Testing frontend connectivity...${colors.reset}`);
  
  if (!process.env.FRONTEND_URL) {
    console.log(`${colors.yellow}⚠ Cannot test frontend connectivity: FRONTEND_URL is not set${colors.reset}`);
    return false;
  }
  
  return new Promise((resolve) => {
    const url = process.env.FRONTEND_URL;
    console.log(`${colors.blue}ℹ Attempting to connect to frontend at: ${url}${colors.reset}`);
    
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      console.log(`${colors.blue}ℹ Response status code: ${res.statusCode}${colors.reset}`);
      
      if (res.statusCode >= 200 && res.statusCode < 400) {
        console.log(`${colors.green}✓ Successfully connected to frontend${colors.reset}`);
        resolve(true);
      } else {
        console.log(`${colors.red}✗ Received error status code from frontend${colors.reset}`);
        resolve(false);
      }
    });
    
    req.on('error', (error) => {
      console.log(`${colors.red}✗ Failed to connect to frontend: ${error.message}${colors.reset}`);
      resolve(false);
    });
    
    req.end();
  });
};

// Check system resources
const checkSystemResources = () => {
  console.log(`\n${colors.magenta}Checking system resources...${colors.reset}`);
  
  const memoryUsage = process.memoryUsage();
  const memoryUsageMB = {
    rss: (memoryUsage.rss / 1024 / 1024).toFixed(2),
    heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
    heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
    external: (memoryUsage.external / 1024 / 1024).toFixed(2),
  };
  
  console.log(`${colors.blue}ℹ Memory Usage:${colors.reset}`);
  console.log(`  - RSS: ${memoryUsageMB.rss} MB`);
  console.log(`  - Heap Total: ${memoryUsageMB.heapTotal} MB`);
  console.log(`  - Heap Used: ${memoryUsageMB.heapUsed} MB`);
  console.log(`  - External: ${memoryUsageMB.external} MB`);
  
  // Check if memory usage is high
  if (parseFloat(memoryUsageMB.heapUsed) > 450) {
    console.log(`${colors.red}✗ Memory usage is high. Heroku's free tier has a 512MB limit.${colors.reset}`);
    return false;
  } else {
    console.log(`${colors.green}✓ Memory usage is within acceptable limits${colors.reset}`);
    return true;
  }
};

// Run all checks
const runDiagnostics = async () => {
  const envVarsOk = checkEnvironmentVariables();
  const mongoDbOk = await testMongoDBConnection();
  const frontendOk = await testFrontendConnectivity();
  const resourcesOk = checkSystemResources();
  
  console.log(`\n${colors.cyan}=== Diagnostic Results ===${colors.reset}`);
  console.log(`${envVarsOk ? colors.green + '✓' : colors.red + '✗'} Environment Variables: ${envVarsOk ? 'OK' : 'Issues Found'}${colors.reset}`);
  console.log(`${mongoDbOk ? colors.green + '✓' : colors.red + '✗'} MongoDB Connection: ${mongoDbOk ? 'OK' : 'Issues Found'}${colors.reset}`);
  console.log(`${frontendOk ? colors.green + '✓' : colors.yellow + '⚠'} Frontend Connectivity: ${frontendOk ? 'OK' : 'Issues Found'}${colors.reset}`);
  console.log(`${resourcesOk ? colors.green + '✓' : colors.yellow + '⚠'} System Resources: ${resourcesOk ? 'OK' : 'Issues Found'}${colors.reset}`);
  
  if (envVarsOk && mongoDbOk && frontendOk && resourcesOk) {
    console.log(`\n${colors.green}All checks passed! If you're still experiencing issues, please refer to HEROKU_TROUBLESHOOTING.md for more advanced troubleshooting steps.${colors.reset}`);
  } else {
    console.log(`\n${colors.yellow}Some checks failed. Please address the issues above and try again.${colors.reset}`);
    console.log(`${colors.yellow}For more detailed troubleshooting, refer to HEROKU_TROUBLESHOOTING.md${colors.reset}`);
  }
};

// Run the diagnostics
runDiagnostics().catch(error => {
  console.error(`${colors.red}An unexpected error occurred during diagnostics: ${error.message}${colors.reset}`);
  process.exit(1);
});