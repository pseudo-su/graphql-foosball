const uuidv4 = require('uuid/v4');
const { leagues, user_league_membership } = require('./memory-store');

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

function searchLeagues({ userId = null }) {
  let _leagues = leagues
    .filter(l => l.deleted !== true);

  if (userId !== null) {
    const userLeagues = user_league_membership
      .filter(
        m => m.userId == userId,
      )
      .map(m => m.leagueId)

    _legues = _leagues
      .filter(l => userLeagues.includes(l.id))
  }
  console.log(_leagues)

  return _leagues;
}
