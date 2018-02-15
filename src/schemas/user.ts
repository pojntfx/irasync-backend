export default `
  # A creator || consumer
  type User {
    id: Int!
    email: String!
    username: String!
    organisations: [Organization!]! # User can get communities through channels
  }

  type Query {
    getUser(id: Int!): User!
    allUsers(id: Int!): [User]
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String!): User!
  }
`;
