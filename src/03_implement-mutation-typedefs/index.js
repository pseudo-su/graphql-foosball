const { ApolloServer, gql } = require('apollo-server');
const { typeDefs } = require('./schema.graphql');

const resolvers = {
  Query: {
    leagues: () => [{ id: 'league-1' }],
    tables: () => [{ id: 'table-1' }],
    matches: () => [{ id: 'match-1' }],
    users: () => [{ id: 'user-1' }],

    me: () => ({ id: 'user-1' }),
  },
  League: {
    id: parent => parent.id,
    name: () => 'League 1',
    matches: () => [{
      id: 'match-1',
    }],
  },
  MatchPlayer: {
    id: parent => parent.id,
    team: () => 'TEAM_A',
    user: () => ({ id: 'user-1' }),
  },
  Match: {
    id: parent => parent.id,
    status: () => 'CREATED',
    table: () => ({ id: 'table-1' }),
    league: () => ({ id: 'league-1' }),
    players: () => [{ id: 'match-1_user-1' }, { id: 'match-1_user-2' }],
  },
  Table: {
    id: parent => parent.id,
    name: () => 'Table 1',
    leagues: () => [{ id: 'league-1' }],
    creator: () => ({ id: 'user-1' }),
  },
  User: {
    id: parent => parent.id,
    username: () => 'some-username',
    firstName: () => 'Bob',
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
