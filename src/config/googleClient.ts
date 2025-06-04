import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { decodeServiceKey } from '../utils/decodeKey';
import dotenv from 'dotenv';

dotenv.config();

const base64Key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
if (!base64Key) {
    throw new Error('Falta GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 en el archivo .env');
}

const keyPath = decodeServiceKey(base64Key);
const credentials = require(keyPath);

export const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const sheets = google.sheets({ version: 'v4', auth });
