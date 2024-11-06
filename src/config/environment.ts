import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Environment {
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
}

export const env: Environment = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    SUPABASE_URL: process.env.SUPABASE_URL || '',
    SUPABASE_KEY: process.env.SUPABASE_KEY || ''
}

function validateEnv(): void {
    const required = ['PORT', 'DATABASE_URL', 'JWT_SECRET', 'SUPABASE_URL', 'SUPABASE_KEY'] as const;
    for (const key of required) {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    }
}

validateEnv();
    
export default env;
