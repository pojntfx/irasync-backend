export default `

  # The highest order entity, serves as the governing body of one or multiple communities & write control
  type Organization {
    id: Int!
    name: String!
    owner: User!
    members: [User!]!
    communities: [Community!]!
  }

  # A collection of posts (and files, wikis etc. in the future)
  type Community {
    id: Int!
    name: String!
    public: Boolean!
    posts: [Post!]!
    users: [User!]! # Users that can see it (if private)
  }

  # Content entity by a user
  type Post {
    id: Int!
    title: String!
    text: String!
    user: User!,
    community: Community!
  }

  # A creator || consumer
  type User {
    id: Int!
    email: String!
    username: String!
    organisations: [Organization!]! # User can get communities through channels
  }

  type Query {
    hi: String
  }
`;
