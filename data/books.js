import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FILE = path.join(__dirname, 'books.json');

export const generateUniqueId = () => crypto.randomBytes(10).toString('hex');


export const bookList = fs.existsSync(FILE) 
    ? JSON.parse(fs.readFileSync(FILE, 'utf8')) 
    : [];

export function saveBooks(){
    fs.writeFileSync(FILE, JSON.stringify(bookList, null, 2))
};
