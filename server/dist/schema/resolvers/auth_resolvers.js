import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
import User from '../../models/User.js';
import { errorHandler } from '../helpers/index.js';
const { sign } = jwt;
function createToken(user_id) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return sign({ user_id: user_id }, process.env.JWT_SECRET);
}
const auth_resolvers = {
    // In GraphQL you are REQUIRED to make at least ONE query function
    Query: {
        // Get user
        async getUser(_, __, context) {
            if (!context.req.user) {
                return {
                    user: null
                };
            }
            return {
                user: context.req.user
            };
        }
    },
    Mutation: {
        /***
         *** AUTH RESOLVERS ***
        ***/
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
                return errorHandler(error);
            }
        },
        // Log a user in
        async loginUser(_, args, context) {
            const user = await User.findOne({
                email: args.email
            });
            if (!user) {
                return {
                    errors: ['No user found with that email address']
                };
            }
            const valid_pass = await user.validatePassword(args.password);
            if (!valid_pass) {
                return {
                    errors: ['Password is incorrect']
                };
            }
            const token = createToken(user._id);
            context.res.cookie('pet_token', token, {
                httpOnly: true,
                secure: process.env.PORT ? true : false,
                sameSite: true
            });
            return {
                user: user
            };
        },
        // Log out user
        logoutUser(_, __, context) {
            context.res.clearCookie('pet_token');
            return {
                user: null
            };
        }
    }
};
export default auth_resolvers;
