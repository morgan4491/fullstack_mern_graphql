import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
import User from '../models/User.js';
const { sign } = jwt;
function createToken(user_id) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return sign({ user_id: user_id }, process.env.JWT_SECRET);
}
const resolvers = {
    // In GraphQL you are REQUIRED to make at least ONE query function
    Query: {
        test() {
            return 'test string';
        }
    },
    Mutation: {
        // Register a user
        async registerUser(_, args, context) {
            try {
                const user = await User.create(args);
                const token = createToken(user._id);
                context.res.cookie('pet_token', token, {
                    // Ask copilot 'Can you explain these properties?' for a full explanation of these additional security measures
                    httpOnly: true,
                    secure: process.env.PORT ? true : false,
                    sameSite: true
                });
                return {
                    user: user
                };
            }
            catch (error) {
                const errors = [];
                if (error.code === 11000) {
                    errors.push('That email address is already in use');
                }
                else {
                    for (const prop in error.errors) {
                        errors.push(error.errors[prop].message);
                    }
                }
                return {
                    errors: errors
                };
            }
        },
        // Log a user in
        loginUser() {
            return 'some string';
        }
    }
};
export default resolvers;
