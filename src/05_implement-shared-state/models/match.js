const uuidv4 = require('uuid/v4');
const { matches, user_match_membership, users } = require('./memory-store');
const { getUser } = require('./user');

module.exports = {
  getMatch,
  createMatch,
  deleteMatch,
  searchMatches
};

function createMatch({
  leagueId,
  tableId,
  teamAplayer1 = null,
  teamAplayer2 = null,
  teamAColor = 'WHITE',
  teamBplayer1 = null,
  teamBplayer2 = null,
  teamBColor = 'YELLOW'
}) {
  const newMatch = {
    id: uuidv4(),
    league: leagueId,

    status: 'CREATED', // CREATED | INPROGRESS | COMPLETE

    teamAplayer1: teamAplayer1,
    teamAplayer2: teamAplayer2,
    teamAColor: teamAColor,

    teamBplayer1: teamBplayer1,
    teamBplayer2: teamBplayer2,
    teamBColor: teamBColor,

    teamAScore: 0,
    teamBScore: 0,

    createdBy: users[0].id,
    createdAt: Date.now(),
    deleted: false
  };
  matches.push(newMatch);
  return newTable;
}

function deleteMatch(id) {
  const match = getMatch(id);
  if (match !== null) {
    match.deleted = true;
  }
  return match;
}

function getMatch(id) {
  return matches.filter(t => t.deleted !== true).find(m => m.id === id);
}

function searchMatches({ hasPlayerId = null, leagueId = null }) {
  let _matches = matches.filter(m => m.deleted !== true);
  if (hasPlayerId !== null) {
    filteredMatchIds = user_match_membership
      .filter(m => m.userId == hasPlayerId)
      .map(m => m.matchId)

    _matches = _matches.filter(
      m => filteredMatchIds.includes(m.id)
    );
  }
  if (leagueId !== null) {
    _matches = _matches.filter(
      m => m.leagueId === leagueId,
    )
  }
  return _matches;
}

