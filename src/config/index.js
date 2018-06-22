import fs from 'fs';
import path from 'path';

// TODO: Import settings from AppData
const configRaw = fs.readFileSync(path.resolve('./config.json'));
const config = JSON.parse(configRaw);

const {
  outputDir,
} = config;

export default {
  outputDir,
};
