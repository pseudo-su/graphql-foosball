const rp = require('request-promise');
const { print } = require('graphql/language/printer');


module.exports = {
  postQuery,
};
const API = 'http://localhost:4000/';

async function postQuery(query, authToken = '1') {
  const response = await rp({
    method: 'POST',
    uri: API,
    headers: {
      Authorization: authToken,
    },
    body: { query: print(query) },
    json: true,
  });
  return response;
}
