export default `
  # A collection of posts and in the future files, wikis etc.
  type Community {
    id: Int!
    name: String!
    public: Boolean!
    posts: [Post!]!
    users: [User!]! # Users that can see it (if private)
  }
`;
