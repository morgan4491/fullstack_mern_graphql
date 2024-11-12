// import User from '../models/User.js';


const resolvers = {
    // In GraphQL you are REQUIRED to make at least ONE query function
    Query: {
        test() {
            return 'test string';
        } 
    }
};

export default resolvers;