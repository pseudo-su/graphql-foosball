
# Task 00 - Create basic GraphQL server using apollo

To begin with we need to get a basic `apollo-server` running and responding to a simple request

## Current state

Nothing is implemented

## Success state

The server must respond to the following request

```graphql
query {
  me {
    id
    username
  }
}
```

Test using

```raw
> npm run test:integration:00
```

## Todo

- import the `gql` and `ApolloServer
- create `typeDefs` and `resolvers`
- initialize new ApolloServer({})
- add Query.me returning an object with a id and name to the typeDefs and resolvers
