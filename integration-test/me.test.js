const { gql } = require('apollo-server');
const { postQuery } = require('./query');

describe('Query logged in users information', () => {
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
    expect(response.data.me.tables[0].name).toMatch('Table in the kitchen');
  });
});
