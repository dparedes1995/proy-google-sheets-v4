import { writeFileSync } from 'fs';
import path from 'path';

export function decodeServiceKey(base64: string): string {
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    const credentialsPath = path.join('/tmp', 'credentials.json');
    writeFileSync(credentialsPath, decoded);
    return credentialsPath;
}
