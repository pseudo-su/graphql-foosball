const models = require('./models');

const Query = {
  tables: (obj, args, context, info) => {
    console.log('-- query tables');
    return models.searchTables({})
  },
  leagues: (obj, args, context, info) => {
    console.log('-- query leagues');
    const leagues = models.searchLeagues({})
    return leagues;
  },
  matches: (obj, args, context, info) => {
    console.log('-- query matches');
    return models.searchMatches({})
  },
  me: (obj, args, context, info) => {
    return {
      ...context.currentUser,
      tables: () => {
        console.log('-- query me.tables');
        const tables = models.searchTables({ userId: context.currentUser.id })
        console.log(tables);
        return tables;
      },
      leagues: () => {
        console.log('-- query me.leagues');
        const leagues = models.searchLeagues({ userId: context.currentUser.id })
        console.log(leagues);
        return leagues;
      },
      matches: () => {
        console.log('-- query me.matches');
        const matches = models.searchMatches({ hasPlayerId: context.currentUser.id })
        console.log(matches);
        return matches;
      }
    };
  }
};

const Mutation = {};

function User(obj, args, context, info) {
  console.log('-- User resolver');
  return {
    id: () => obj.id,
    name: () => obj.name
  };
}

function Match(obj, { matchId, team = null }, context, info) {
  console.log('-- Match resolver');
  return {
    ...obj,
    players: () => {
      console.log(matchId, team);
      let _users = models.searchUsers({ matchId, team })
      if (team !== null) {
        _users = _users.filter(u => u.team == team);
      }
      return _users
    },
  };
}

function Table(parent, args, context, info) {
  console.log('-- Table resolver');
  return {
    ...obj,
  }
}

function League(parent, args, context, info) {
  console.log('-- League resolver');
  return {
    ...obj,
    players: (obj, args, context, info) => models.searchUsers({ leagueId: obj.id }),
    tables: (obj, args, context, info) => models.searchTables({ leagueId: obj.id }),
    matches: (obj, args, context, info) => models.searchMatches({ leagueId: obj.id }),
  }
}

// Provide resolver functions for your schema fields
const resolvers = {
  // Default
  Query,
  Mutation,

  // My Objects
  User,
  Match,
  Table,
  League,
};

module.exports = {
  resolvers
};
