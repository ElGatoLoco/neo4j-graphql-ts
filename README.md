# Neo4J GraphQL w/ TypeScript Starter

## Setup

- Make sure you have a Neo4j database available
- Create .env file in the root of the project and fill in values according to .env.sample
- Run `yarn` to install dependencies
- Run `yarn start` and visit the url provided in the terminal - http://localhost:4000/graphql, if you didn't modify the port
- Checkout other available scripts in package.json

## Test queries

### Create a user

```graphql
mutation {
  CreateUser(id: "123", fullName: "El Gato Loco", email: "someone@something.io") {
    id
    fullName
    email
  }
}
```

### Query available users

```graphql
{
  User {
    id
    fullName
  }
}
```
