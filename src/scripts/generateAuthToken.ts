import { exec } from 'child_process';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import dotenv from "dotenv";

dotenv.config();

// Promisify the exec function
const execAsync = promisify(exec);

// Function to generate an auth token with a 30-day expiry
const generateAuthToken = (payload: object): string => {
  const privateKey = process.env.JWT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('JWT_PRIVATE_KEY environment variable is not set');
  }

  // Sign the token with the private key and set expiry to 30 days
  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '30d',
  });
  return token;
};

// Example usage of the generateAuthToken function
const payload = { user: 'ashikuzzaman-abir@github.com', role: null };
const token = generateAuthToken(payload);

const execute = async (token: string) => {
  try {
    const isWindows = process.platform === 'win32';
    const command = isWindows
      ? `set AUTH_TOKEN=${token} && echo !!COPY THIS TOKEN TO .env AUTH_TOKEN👇🏼!!\n\n${token}`
      : `AUTH_TOKEN=${token} && echo $AUTH_TOKEN`;

    const { stdout, stderr } = await execAsync(command);
    stdout && console.log(`${stdout}`);
    stderr && console.log(`stderr: ${stderr}`);
  } catch (err) {
    console.log('Setting AUTH_TOKEN failed', err);
  }
};

execute(token);
