
# Task 03 - Create basic GraphQL server using apollo

To begin with we need to get a basic `apollo-server` running and responding to a simple request

## Current state

We have a schema defined in `./schema.graphql.js`

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
> npm run test:integration:02
```

## Todo

- `Query.leagues`
- `Query.users`
- `Query.tables`
- `Query.`
