const { gql } = require('apollo-server');
const { postQuery } = require('../query');

describe('Server Exists', () => {
  it(`Simple query`, async () => {
    const query = gql`
      query getMe {
        me {
          id
          username
        }
      }
    `;
    const response = await postQuery(query);
    expect(response.errors || []).toEqual([]);
  });
});
