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
        league {
          id
          name
        }
        creator {
          id
          name
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
          userId
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
    it(`Simple query ${query.definitions[0].name.value}`, async () => {
      const response = await postQuery(query);
      expect(response.errors || []).toEqual([], JSON.stringify({ query, response }, null, 2))
    })
  });
});
