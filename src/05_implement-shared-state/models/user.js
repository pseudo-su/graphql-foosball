const uuidv4 = require('uuid/v4');
const { users, user_match_membership } = require('./memory-store');

module.exports = {
  signupUser,
  loginUser,
  getUser,
  getUserByAuthToken,
  deleteUser,
  searchUsers,
};

function signupUser({ username, name }) {
  const newPlayer = {
    id: uuidv4(),
    username: username,
    name: name,
    authToken: String(users.length + 2),
    createdAt: Date.now(),
    deleted: false,
  };
  users.push(newPlayer)
  return newPlayer;
}

function loginUser({ username }) {
  return getUserByUsername(username);
}

function deleteUser(id) {
  const player = getUser(id);
  if (player !== null) {
    player.deleted = true;
  }
  return player;
}

function getUser(id) {
  return users
  .filter(p => p.deleted !== true)
  .find(p => p.id === id);
}

function getUserByAuthToken(authToken) {
  return users
    .filter(p => p.deleted !== true)
    .find(p => p.authToken === authToken);
}

function getUserByUsername(username) {
  return users
    .filter(p => p.deleted !== true)
    .find(p => p.authToken === authToken);
}

function searchUsers({ matchId = null }) {
  let _users = users.filter(l => l.deleted !== true);
  if (matchId !== null) {
    const members = user_match_membership
      .filter(m => m.matchId === matchId);
    const memberIds = members.map(m => m.userId);
    _users = _users
      .filter(u => memberIds.includes(u.id))
      .map(u => ({
        ...u,
        team: members.find(m => m.matchId === matchId && m.userId === u.id)
      }));
  }
  return _users;
}
