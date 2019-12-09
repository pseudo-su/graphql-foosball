const uuidv4 = require('uuid/v4');

const leagues = [
  {
    id: uuidv4(),
    name: 'DigIO foosball league',
    createdAt: Date.now(),
    deleted: false
  }
];

const users = [
  {
    id: uuidv4(),
    username: 'jstableford',
    name: 'John Stableford',
    authToken: '1',
    createdAt: Date.now(),
    deleted: false
  },
  {
    id: uuidv4(),
    username: 'msiggins',
    name: 'Matthew Siggins',
    authToken: '2',
    createdAt: Date.now(),
    deleted: false
  },
  {
    id: uuidv4(),
    username: 'jgitlin',
    name: 'Jacob Gitlin',
    authToken: '3',
    createdAt: Date.now(),
    deleted: false
  },
  {
    id: uuidv4(),
    username: 'nschnelle',
    name: 'Nick Schnelle',
    authToken: '4',
    createdAt: Date.now(),
    deleted: false
  }
];

const user_league_membership = [
  {
    leagueId: leagues[0].id,
    userId: users[0].id
  }
];

const tables = [
  {
    id: uuidv4(),
    name: 'Table in the kitchen',
    userId: users[0].id,
    createdAt: Date.now(),
    deleted: false
  }
];

const table_league_membership = [
  {
    leagueId: leagues[0].id,
    tableId: tables[0].id
  }
];

const matches = [
  {
    id: uuidv4(),
    leagueId: leagues[0].id,
    tableId: tables[0].id,

    status: 'CREATED', // CREATED | INPROGRESS | COMPLETE
    teamAColor: 'WHITE',
    teamBColor: 'YELLOW',

    teamAScore: 0,
    teamBScore: 0,

    createdBy: users[0].id,
    createdAt: Date.now(),
    deleted: false
  }
];

const match_league_membership = [
  {
    matchId: matches[0].id,
    leagueId: leagues[0].id
  }
];

const user_match_membership = [
  {
    matchId: matches[0].id,
    userId: users[0].id,
    position: 'A1',
  },
  {
    matchId: matches[0].id,
    userId: users[1].id,
    position: 'A2',
  },
  {
    matchId: matches[0].id,
    userId: users[2].id,
    position: 'B1',
  },
  {
    matchId: matches[0].id,
    userId: users[3].id,
    position: 'B2',
  }
];

module.exports = {
  leagues,
  users,
  tables,
  user_league_membership,
  table_league_membership,
  matches,
  match_league_membership,
  user_match_membership,
};
