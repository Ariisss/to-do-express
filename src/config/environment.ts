import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Environment {
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
}

export const env: Environment = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || ''
}

function validateEnv(): void {
    const required = ['PORT', 'DATABASE_URL', 'JWT_SECRET'] as const;
    for (const key of required) {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    }
}

validateEnv();
    
export default env;
