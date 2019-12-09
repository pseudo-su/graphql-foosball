const { gql } = require('apollo-server');
const { postQuery } = require('../query');

describe('Validate that the resolvers adhere to the query schema', () => {
  it(`Simple query ${query.definitions[0].name.value}`, async () => {
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
