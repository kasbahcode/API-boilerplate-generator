const fs = require('fs-extra');
const path = require('path');
const os = require('os');

// Store usage data in user's home directory
const USAGE_FILE = path.join(os.homedir(), '.api-generator-usage.json');

async function getUsageData() {
  try {
    if (await fs.pathExists(USAGE_FILE)) {
      return await fs.readJson(USAGE_FILE);
    }
    return { used: 0, firstUsed: null };
  } catch (error) {
    return { used: 0, firstUsed: null };
  }
}

async function saveUsageData(data) {
  try {
    await fs.writeJson(USAGE_FILE, data);
  } catch (error) {
    console.error('Warning: Could not save usage data');
  }
}

async function checkUsageLimit() {
  const data = await getUsageData();
  return data.used < 3;
}

async function incrementUsage() {
  const data = await getUsageData();
  data.used += 1;
  
  if (!data.firstUsed) {
    data.firstUsed = new Date().toISOString();
  }
  
  await saveUsageData(data);
}

async function getUsageStatus() {
  return await getUsageData();
}

module.exports = {
  checkUsageLimit,
  incrementUsage,
  getUsageStatus
}; 