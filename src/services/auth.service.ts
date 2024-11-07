import { User, UserCreate, UserLogin, AuthResponse } from '../types/types';
import { hashPassword, comparePasswords } from '../utils/password.utils';
import { generateToken } from '../utils/jwt.utils';
import UserModel from '../models/user.model';
import sequelize from '../config/database';

// to dos:
// User registration
// User login
// Password handling (using password.utils)
// JWT token generation (using jwt.utils)

export async function register(userData: UserCreate): Promise<AuthResponse> {

    const transaction = await sequelize.transaction();

    try {
        // check if user already exists
        const existingUser = await UserModel.findOne({
            where:{ email: userData.email},
            transaction
        })

        if(existingUser) {
            throw new Error('User already exists');
        }

        //hash the password
        const hashedPassword = await hashPassword(userData.password);

        const newUser = await UserModel.create(
            {
                email: userData.email,
                password_hash: hashedPassword
            },
            {
                transaction
            }
        )

        await transaction.commit()

        const userResponse = {
            id: newUser.id,
            email: newUser.email,
            created_at: newUser.created_at
        }

        return {
            user: userResponse,
            token: generateToken(newUser)
        }

    }catch(error) {
        await transaction.rollback();
        throw error;
    }

}

export async function login(userData: UserLogin): Promise<AuthResponse> {

    try {
        // check if user exists
        const user = await UserModel.findOne({
            where: { email: userData.email }
        })

        // if n ot return it
        if(!user) {
            throw new Error('Invalid email or password');
        }

        // check if passwordis valid
        const isPasswordValid = await comparePasswords(userData.password, user.password_hash);

        if(!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const userResponse = {
            id: user.id,
            email: user.email,
            created_at: user.created_at
        }

        // return user response and token
        return {
            user: userResponse,
            token: generateToken(userResponse)
        }


    }catch(error) {
        throw error;
    }

}
