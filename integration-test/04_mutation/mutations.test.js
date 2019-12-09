const { gql } = require('apollo-server');
const { postQuery } = require('../query');

const queries = [
  [
    gql`
      mutation userSignup {
        userSignup(username: "some_username", firstName: "bob") {
          id
          username
          firstName
        }
      }
    `,
    {}
  ],
  [
    gql`
      mutation userLogin {
        userLogin(username: "some_username", password: "some-password") {
          jwtToken
        }
      }
    `,
    {}
  ],
  [
    gql`
      mutation createTable {
        createTable(name: "some name", leagueIds: ["league-1"]) {
          id
          name
        }
      }
    `,
    {}
  ],
  [
    gql`
      mutation createLeague {
        createLeague(name: "some name") {
          id
          name
        }
      }
    `,
    {}
  ],
  [
    gql`
      mutation createMatch($createMatchInput:CreateMatchInput!) {
        createMatch(input: $createMatchInput) {
          id
          status
          teamAScore
          teamBScore
        }
      }
    `,
    {
      createMatchInput: {
        teamAColor: 'WHITE',
        teamBColor: 'YELLOW',
        leagueId: 'league-1',
        tableId: 'table-1',
        players: [{ userId: 'user-1', team: 'TEAM_A' }]
      }
    }
  ],
  [
    gql`
      mutation enterLeague {
        enterLeague(leagueId: "league-1")
      }
    `,
    {}
  ],
  [
    gql`
      mutation startMatch {
        startMatch(matchId: "match-1") {
          id
          status
          players {
            id
            user {
              id
              username
            }
            team
          }
          teamAScore
          teamBScore
        }
      }
    `,
    {}
  ],
  [
    gql`
      mutation scoreMatchPoint {
        scoreMatchPoint(matchId: "match-1", team: TEAM_A) {
          id
          status
          teamAScore
          teamBScore
        }
      }
    `,
    {}
  ],
  [
    gql`
      mutation scoreTablePoint {
        scoreTablePoint(tableId: "table-1", color: WHITE) {
          id
          status
          teamAScore
          teamBScore
        }
      }
    `,
    {}
  ]
];

describe('Validate that the resolvers adhere to the query schema', () => {
  queries.forEach(([query, variables], idx) => {
    it(`Mutation ${query.definitions[0].name.value}`, async () => {
      const response = await postQuery(query, variables);
      expect(response.errors || []).toEqual(
        [],
        JSON.stringify({ query, response }, null, 2)
      );
      ensureNoEmptyArrays({ data: response.data });
    });
  });
});

function ensureNoEmptyArrays({ data = {} }) {
  const checks = Object.entries(data).map(([key, val]) => {
    if (Array.isArray(val)) {
      if (val.length < 1) {
        expect(val).not.toEqual([]);
        return true;
      }
      const checks = val.map(v => ensureNoEmptyArrays({ data: v }));
      return checks.includes(true);
    }
    if (typeof val === 'object') {
      return ensureNoEmptyArrays({ data: val });
    }
    return false;
  });
  return checks.includes(true);
}
