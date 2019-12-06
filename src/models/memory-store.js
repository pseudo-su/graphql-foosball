const uuidv4 = require('uuid/v4');

const leagues = [
  {
    id: uuidv4(),
    name: 'DigIO foosball league',
    createdAt: Date.now(),
    deleted: false,
  }
];

const users = [
  {
    id: uuidv4(),
    username: 'jstableford',
    name: 'John Stableford',
    authToken: '1',
    createdAt: Date.now(),
    deleted: false,
  },
  {
    id: uuidv4(),
    username: 'msiggins',
    name: 'Matthew Siggins',
    authToken: '2',
    createdAt: Date.now(),
    deleted: false,
  },
  {
    id: uuidv4(),
    username: 'jgitlin',
    name: 'Jacob Gitlin',
    authToken: '3',
    createdAt: Date.now(),
    deleted: false,
  },
  {
    id: uuidv4(),
    username: 'nschnelle',
    name: 'Nick Schnelle',
    authToken: '4',
    createdAt: Date.now(),
    deleted: false,
  }
];

const tables = [
  {
    id: uuidv4(),
    name: 'Table in the kitchen',
    leagues: [leagues[0].id],
    player: users[0].id,
    createdAt: Date.now(),
    deleted: false,
  }
];

const matches = [{
  id: uuidv4(),
  league: leagues[0].id,

  status: 'CREATED', // CREATED | INPROGRESS | COMPLETE

  teamAplayer1: users[0].id,
  teamAplayer2: users[1].id,
  teamBplayer1: users[2].id,
  teamBplayer2: users[3].id,

  teamApoints: 0,
  teamBpoints: 0,

  createdBy: users[0].id,
  createdAt: Date.now(),
  deleted: false,
}];

module.exports = {
  leagues,
  users,
  tables,
  matches,
};
