const { gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Session {
    jwtToken: String!
  }

  type Query {
    # admin can read all tables, leagues, matches
    tables: [Table!]!
    leagues: [League]!
    matches: [Match!]!
    users: [User!]!

    # logged in user can view their profile data
    me: User!
  }

  type Mutation {
    # User creation/login
    userSignup(username: String!, firstName: String!): User!
    userLogin(username: String!, password: String!): Session!

    # Any user can create tables, leagues and matches
    createTable(name: String!, leagueIds: [ID!]!): Table!
    createLeague(name: String!): League!
    createMatch(input: CreateMatchInput!): Match!

    # User can enter themselves in a league
    enterLeague(leagueId: ID!): Boolean!

    startMatch(matchId: ID!): Match!
    # Add a point for one of the teams for a specific match
    scoreMatchPoint(matchId: ID!, team: MatchTeam!): Match!
    # A table can broadcast that a point was scored on it
    # the application then needs to determine if/what match the point is registered against
    scoreTablePoint(tableId: ID!, color: MatchTeamColor!): Match!
  }

  # --- LEAGUE

  type League {
    id: ID!
    name: String!
    players: [User!]!
    tables: [Table!]!
    matches: [Match!]!
  }

  # --- TABLE

  type Table {
    id: ID!
    name: String!
    leagues: [League!]!
    creator: User!
  }

  # --- MATCH

  enum MatchTeam {
    TEAM_A
    TEAM_B
  }
  enum MatchTeamColor {
    WHITE
    YELLOW
  }

  enum MatchStatus {
    CREATED
    INPROGRESS
    COMPLETE
  }

  input MatchPlayerInput {
    userId: ID!
    team: MatchTeam!
  }

  input CreateMatchInput {
    leagueId: ID!
    tableId: ID!
    players: [MatchPlayerInput!]!
    teamAColor: MatchTeamColor
    teamBColor: MatchTeamColor
  }

  type MatchPlayer {
    id: ID!
    team: MatchTeam!
    user: User!
  }

  type Match {
    id: ID!
    status: MatchStatus!
    players(team: MatchTeam): [MatchPlayer!]!
    teamAScore: Int!
    teamAColor: MatchTeamColor
    teamBScore: Int!
    teamBColor: MatchTeamColor
    table: Table!
    league: League!
  }

  # --- USER

  type User {
    id: ID!
    username: String!,
    firstName: String!
    tables: [Table!]!
    leagues: [League!]!
    matches: [Match!]!
  }
`;

module.exports = {
  typeDefs,
}
