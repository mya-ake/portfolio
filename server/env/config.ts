import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || '3000';
export const SERVER_ENV = process.env.SERVER_ENV || 'local';
export const CONTENTS_BUCKET_NAME = process.env.CONTENTS_BUCKET_NAME || '';
export const CONTENTS_KEY_PREFIX = process.env.CONTENTS_KEY_PREFIX || '';
