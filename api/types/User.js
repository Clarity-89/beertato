module.exports = /* GraphQL */ `
  type User {
    id: String!
    email: String!
    username: String
  }

  type AuthUser {
    id: String!
    email: String!
    username: String
    token: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(username: String, email: String!, password: String!): AuthUser
    login(email: String!, password: String!): AuthUser
  }
`;
