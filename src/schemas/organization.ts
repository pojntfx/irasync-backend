export default `
  # The highest order entity, serves as the governing body of one or multiple communities & write control
  type Organization {
    id: Int!
    name: String!
    owner: User!
    members: [User!]!
    communities: [Community!]!
  }
`;
