const { gql } = require('apollo-server');
const { postQuery } = require('./query');

describe.skip('Search', () => {
  it('tables', async () => {
    const query = gql`
      query {
        tables {
          id
          name
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([])
    expect(response.data.tables[0].name).toMatch('Table in the kitchen');
  });
  it('matches', async () => {
    const query = gql`
      query {
        matches {
          id
          status
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([])
    expect(response.data.matches[0].status).toMatch('CREATED');
  });
  it('leagues', async () => {
    const query = gql`
      query {
        leagues {
          id
          name
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([])
    expect(response.data.leagues[0].name).toMatch('DigIO foosball league');
  });
  it('complete', async () => {
    const query = gql`
      query {
        tables {
          id
          name
        }
        matches {
          id
          status
          players {
            id
          }
        }
        leagues {
          id
          name
        }
      }
    `;

    const response = await postQuery(query);
    expect(response.errors || []).toEqual([])
    expect(response.data.leagues[0].name).toMatch('DigIO foosball league');
  });
});
