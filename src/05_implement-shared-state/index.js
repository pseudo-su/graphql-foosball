const { ApolloServer, gql } = require('apollo-server');
const models = require('./models');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./schema.graphql');

async function contextFn({ req }) {
  let authToken = null;
  let currentUser = null;

   try {
      authToken = req.headers["authorization"];

      if (authToken) {
           currentUser = models.getUserByAuthToken(authToken);
      }
   } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
   }
  return {
      authToken,
      currentUser,
  };
}

const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  context: contextFn,
  schemaDirectives: {},
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
