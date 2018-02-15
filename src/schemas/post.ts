export default `
  # Content entity by a user
  type Post {
    id: Int!
    title: String!
    text: String!
    user: User!,
    community: Community!
  }
`;
