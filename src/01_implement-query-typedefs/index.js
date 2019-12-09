const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User!
  }
  type User {
    id: ID!
    username: String!
  }
`

const resolvers = {
  Query: {
    me: () => ({ id: 'ID', username: 'jstableford' })
  }
};

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  schemaDirectives: {},
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
