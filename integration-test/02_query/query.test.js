const { gql } = require('apollo-server');
const { postQuery } = require('../query');

const queries = [
  // SIMPLE FLAT QUERIES
  gql`
    query getTablesFlat {
      tables {
        id
        name
      }
    }
  `,
  gql`
    query getLeaguesFlat {
      leagues {
        id
        name
      }
    }
  `,
  gql`
    query getMatchesFlat {
      matches {
        id
        status
      }
    }
  `,
  gql`
    query getUsersFlat {
      users {
        id
        firstName
      }
    }
  `,
  gql`
    query getMeFlat {
      me {
        id
        username
        firstName
      }
    }
  `,
  // NESTED QUERIES
  gql`
    query getTablesNested {
      tables {
        id
        name
        leagues {
          id
          name
        }
        creator {
          id
          username
          firstName
        }
      }
    }
  `,
  gql`
    query getLeaguesNested {
      leagues {
        id
        name
      }
    }
  `,
  gql`
    query getMatchesNested {
      matches {
        id
        status
        players {
          id
          user {
            id
          }
          team
        }
        league {
          id
          name
        }
        table {
          id
          name
        }
      }
    }
  `,
  gql`
    query getUsersNested {
      users {
        id
        firstName
      }
    }
  `,
  gql`
    query getMeNested {
      me {
        id
        username
        firstName
      }
    }
  `,
];

describe('Validate that the resolvers adhere to the query schema', () => {
  queries.forEach((query, idx) => {
    it(`Query ${query.definitions[0].name.value}`, async () => {
      const response = await postQuery(query);
      expect(response.errors || []).toEqual([], JSON.stringify({ query, response }, null, 2))
      ensureNoEmptyArrays({ data: response.data })
    })
  });
});

function ensureNoEmptyArrays({ data = {} }) {
  const checks = Object.entries(data).map(([key, val]) => {
    if (Array.isArray(val)) {
      if (val.length < 1) {
        expect(val).not.toEqual([])
        return true
      }
      const checks = val.map(v => ensureNoEmptyArrays({ data: v }))
      return checks.includes(true)
    }
    if (typeof val === 'object') {
      return ensureNoEmptyArrays({ data: val })
    }
    return false
  })
  return checks.includes(true);
}
