
# Task 01 - Implement query typedefs

We want to create an application that supports running Foosball leagues.

We will now need to come up with a schema (type-definitions) to support querying foosball data.

## Current state

We have a working server responding to a simple graphql query

## Success state

The following describes details about the data model:

- A user
  - Can own many tables
  - Can own many leagues
- A table
  - Is owned by a user
  - Can be assigned to multiple leagues
- A league
  - Can have many matches
  - Can have many users signed up to play
  - Can have many tables
- A match
  - Always has two teams ("A" and "B")
  - Must have a table and league associated with it
  - Can either be `CREATED`, `INPROGRESS` or `COMPLETE`
  - Can have between 0 and 4 players
  - Each player is either on team "A" or "B"
  - Each team is assigned a color of `WHITE` or `YELLOW`
  - Keeps track of the points scored for team A and team B

The typedefs should support users querying the following information:

- All the
  - tables
  - leagues
  - matches
  - users
- The current logged in user's
  - tables they own
  - leagues they own/run
  - matches they have participated in
