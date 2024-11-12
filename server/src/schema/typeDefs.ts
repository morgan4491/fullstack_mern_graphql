
// This gql variable is so that we use the GraphQL Syntax Highlighting extension
// This makes the template literal string in typeDefs, easier to read
const gql = String.raw;


const typeDefs = gql`

    type Query {
        test: String
    }


`;


export default typeDefs;