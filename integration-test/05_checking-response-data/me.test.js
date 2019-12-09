const { gql } = require('apollo-server');
const { postQuery } = require('./query');

describe.skip('Query logged in users information', () => {
  it('simple info', async () => {
    const query = gql`
      query {
        me {
          id
          name
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([])
    expect(response.data.me.name).toMatch('John Stableford');
  });
  it('tables', async () => {
    const query = gql`
      query {
        me {
          tables {
            id
            name
          }
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([])
    expect(response.data.me.tables[0].name).toMatch('Table in the kitchen');
  });
  it('matches', async () => {
    const query = gql`
      query {
        me {
          matches {
            id
            status
          }
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([])
    expect(response.data.me.matches[0].status).toMatch('CREATED');
  });
  it('leagues', async () => {
    const query = gql`
      query {
        me {
          leagues {
            id
            name
          }
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([])
    expect(response.data.me.leagues[0].name).toMatch('DigIO foosball league');
  });
  it('complete', async () => {
    const query = gql`
      query {
        me {
          id
          name
          tables {
            id
            name
          }
          matches {
            id
            status
            players(team: TEAM_A) {
              id
            }
          }
          leagues {
            id
            name
          }
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([])
    expect(response.data.me.leagues[0].name).toMatch('DigIO foosball league');
  });
});
