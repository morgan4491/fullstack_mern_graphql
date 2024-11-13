import { Types } from 'mongoose';
import Pet from '../../models/Pet.js';
import Post from '../../models/Post.js';
import Context from '../../interfaces/Context.js';

import { errorHandler } from '../helpers/index.js';

type PetArguments = {
    name?: string;
    type?: string;
    age?: number;
}

type PostArguments = {
    title: string;
    body: string;
    pet: Types.ObjectId;
}

const pet_resolvers = {
    Query: {
        // Get all posts
        async getAllPosts() {
            const posts = await Post.find().populate('pet');

            return posts;
        },

        // Get user pets
        async getUserPets(_: any, __: any, context: Context) {

            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                }
            }

            const pets = await Pet.find({
                owner: context.req.user._id
            })

            return pets;
        },

        // Get pet posts
        async getPostsForPet(_: any, args: {pet_id: Types.ObjectId}) {
            const posts = await Post.find({
                pet: args.pet_id
            });

            return posts;
        }
    },

    Mutation: {
        // Create a pet
        async createPet(_: any, args: PetArguments, context: Context) {

            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                }
            }

            try {
                const pet = await Pet.create({
                    ...args,
                    owner: context.req.user._id
                });

                context.req.user.pets.push(pet._id);
                await context.req.user.save();

                return {
                    message: 'Pet added successfully!'
                }

            } catch (error) {
                return errorHandler(error);
            }
        },

        // Create a post for a pet
        async createPost(_: any, args: PostArguments, context: Context) {

            if (!context.req.user) {
                return {
                    errors: ['You are not authorized to perform this action']
                }
            }

            try {
                // Option 1 to create post and add to a pet
                const post = await Post.create(args);
                
                await Pet.findByIdAndUpdate(args.pet, {
                    $push: {
                        posts: post._id
                    }
                })

                // Option 2 to create post and add to a pet
                // const pet = await Pet.findById(args.pet);
                // const post = await Post.create(args);

                // pet?.posts.push(post._id);
                // pet?.save();

                return {
                    message: 'Post created successfully!'
                }

            } catch (error) {
                return errorHandler(error);
            }
        }
    }
}

export default pet_resolvers;