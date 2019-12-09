const { gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    # admin can read all tables, leagues, matches
    tables: [Table!]!
    leagues: [League]!
    matches: [Match!]!
    users: [User!]!

    # logged in user can view their profile data
    me: User!
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
