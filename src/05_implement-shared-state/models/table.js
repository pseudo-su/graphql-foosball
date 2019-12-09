const uuidv4 = require('uuid/v4');
const { tables } = require('./memory-store');
const { getUser } = require('./user');

module.exports = {
  getTable,
  createTable,
  deleteTable,
  searchTables,
};

function createTable({ name, currentUser }) {
  const player = getUser(currentUser.id)
  const newTable = {
    id: uuidv4(),
    leagues: [],
    name: name,
    player: player.id,
    createdAt: Date.now(),
    deleted: false,
  };
  tables.push(newTable)
  return newTable;
}

function deleteTable(id) {
  const table = getTable(id);
  if (table !== null) {
    table.deleted = true;
  }
  return table;
}

function getTable(id) {
  return tables
    .filter(t => t.deleted !== true)
    .find(t => t.id === id);
}

function searchTables({ userId = null }) {
  const _tables = tables.filter(l => l.deleted !== true);
  if (userId !== null) {
    return _tables
      .filter(t => t.userId === userId)
  }
  return _tables
}
