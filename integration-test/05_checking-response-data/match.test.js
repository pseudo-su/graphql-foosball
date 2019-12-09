const { gql } = require('apollo-server');
const { postQuery } = require('./query');

describe.skip('Match functions', () => {
  it.todo('create a match')
  it.todo('assign users to a match')
  it.todo('start a match')
  it.todo('team scores a point')
  it.todo('table broadcasts point scored')
  it.todo('match finishes')
});

describe.skip('Query match', () => {
  it('team players', async () => {
    const query = gql`
      query {
        leagues {
          id
          name
          matches {
            aPlayers: players(team: TEAM_A) {
              id
              name
            }
            bPlayers: players(team: TEAM_B) {
              id
              name
            }
          }
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([]);
    expect(response.data.leagues[0].name).toMatch('DigIO foosball league');
    expect(response.data.leagues[0].matches[0].aPlayers.length).toEqual(2);
    expect(response.data.leagues[0].matches[0].bPlayers.length).toEqual(2);
  })
})
