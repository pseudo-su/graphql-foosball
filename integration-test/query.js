const rp = require('request-promise');
const { print } = require('graphql/language/printer');


module.exports = {
  postQuery,
};

const API = 'http://localhost:4000/';

const defaultHeaders = {
  Authorization: '1',
}

async function postQuery(query, variables = {}, headers = defaultHeaders) {
  console.log(print(query))
  const response = await rp({
    method: 'POST',
    uri: API,
    headers: headers,
    body: {
      query: print(query),
      variables,
    },
    json: true,
  });
  // console.log(JSON.stringify(response, null, 2));
  return response;
}
