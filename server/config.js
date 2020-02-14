import dotenv from 'dotenv';

dotenv.config();

export const redisUrl = process.env.REDIS_URL;
export const atUsername = process.env.AT_USERNAME;
export const atKey = process.env.AT_KEY;
