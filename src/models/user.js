const uuidv4 = require('uuid/v4');
const { users } = require('./memory-store');

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
  console.log(users)
  return users
    .filter(p => p.deleted !== true)
    .find(p => p.authToken === authToken);
}

function getUserByUsername(username) {
  return users
    .filter(p => p.deleted !== true)
    .find(p => p.authToken === authToken);
}

function searchUsers() {
  return users.filter(l => l.deleted !== true);
}
