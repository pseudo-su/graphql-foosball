const { gql } = require('apollo-server');
const { postQuery } = require('./query');

describe.skip('Query leagues', () => {
  it('list leagues', async () => {
    const query = gql`
      query {
        leagues {
          id
          name
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([]);
    expect(response.data.leagues[0].name).toMatch('DigIO foosball league');
  });

  it('list full detail', async () => {
    const query = gql`
      query {
        leagues {
          id
          name
          matches {
            id
            players {
              id
              name
            }
          }
          players {
            id
            name
          }
          tables {
            id
            name
          }
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([]);
    expect(response.data.leagues[0].name).toMatch('DigIO foosball league');
    expect(response.data.leagues[0].players[0].name).toMatch('John Stableford');
    expect(response.data.leagues[0].matches.length).toEqual(1)
    expect(response.data.leagues[0].matches[0].players[0].name).toMatch('John Stableford');
    expect(response.data.leagues[0].tables[0].name).toMatch('Table in the kitchen');
  });
});

describe('League functions', () => {
  it.todo('create a league');
  it.todo('join a league');
});

describe('Table functions', () => {
  it.todo('create a table');
  it.todo('associate a table with a league');
});
