const { ApolloServer, gql } = require('apollo-server');
const models = require('./models');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar AuthToken
  enum TeamCode {
    A
    B
  }
  enum TeamColor {
    WHITE
    YELLOW
  }

  type Query {
    me: User!
    leagues: [League!]!
  }

  input CreateMatchInput {
    leagueId: ID!
    tableId: ID!
    teamAplayer1: ID!
    teamAplayer2: ID
    teamAColor: TeamColor
    teamBplayer1: ID!
    teamBplayer2: ID
    teamBColor: TeamColor
  }

  type Mutation {
    userSignup(username: String!, name: String!): User
    userLogin(username: String!, password: String!): AuthToken

    createTable(name: String!, leagueIds: [ID!]!): Table
    createLeague(name: String!): League
    createMatch(input: CreateMatchInput!): Match

    enterLeague(leagueId: ID!): User

    startMatch(matchId: ID!): Match
    scoreMatchPoint(matchId: ID!, team: TeamCode!): Match
    scoreTablePoint(tableId: ID!, color: TeamColor!): Match!
  }

  type League {
    id: ID!
    name: String!
    players: [User!]
    tables: [Table!]
    matches: [Match!]
  }

  type Table {
    id: ID!
    name: String!
  }

  type MatchTeam {
    player1: User!
    player2: User!
    score: Int!
  }

  type Match {
    id: ID!
    teamA: MatchTeam!
    teamB: MatchTeam!
  }

  type User {
    id: ID!
    name: String!
    tables: [Table!]!
    leagues: [League!]
    matches: [Match!]
  }
`;

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

const queryResolvers = {
  me: (obj, args, context, info) => {
    console.log(context);
    return context.currentUser;
  },
  leagues: (obj, args, context, info) => {
    return model.searchLeagues();
  }
};

const mutationResolvers = {

};

// Provide resolver functions for your schema fields
const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: contextFn,
  schemaDirectives: {},
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
