const uuidv4 = require('uuid/v4');
const { leagues } = require('./memory-store');

module.exports = {
  getLeague,
  createLeague,
  deleteLeague,
  searchLeagues,
};

function createLeague({ name }) {
  const newLeague = {
    id: uuidv4(),
    name: name,
    createdAt: Date.now(),
    deleted: false,
  };
  leagues.push(newLeague)
  return newLeague;
}

function deleteLeague(id) {
  const league = getLeague(id);
  if (league !== null) {
    league.deleted = true;
  }
  return league;
}

function getLeague(id) {
  return leagues
    .filter(l => l.deleted !== true)
    .find(l => l.id === id);
}

function searchLeagues() {
  return leagues.filter(l => l.deleted !== true);
}
