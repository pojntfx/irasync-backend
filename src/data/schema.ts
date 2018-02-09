// Enable the exporting of the schema
import { makeExecutableSchema } from "graphql-tools";
// Import the resolver class
import { Resolvers } from "./resolvers";

/**
 * The API's syntax definition
 */
export class Schema {
  // The schema type definitions
  private readonly types: string[];
  // The schema that has been made executable
  private executableSchema: any;
  // The new instance of resolvers
  private resolvers: any;

  constructor() {
    // The type definitions
    this.types = [`
      # A post by the author's username
      type Post {
        id: Int
        title: String
        username: String
        description: String
        community: String
        url: String
      }
      # The queries
      type Query {
        # Return a post by it's id, which is required
        post(id: Int!): Post
        # Return all posts
        posts: [Post]
      }
      # The mutations
      type Mutation {
        # Create a post
        createPost(
          # The author's username
          username: String!,
          # The community that the post should be posted in
          community: String!,
          # The post's title (short and concise)
          title: String!,
          # The URL that the post should lead to
          url: String,
          # The posts content
          description: String
        ): Post
      }
    `];
    // Use the resolvers to make the schema usable
    this.createResolvers();
    this.makeSchemaExecutable();
  }

  /**
   * Create a new instance of the Resolvers class
   */
  private createResolvers() {
    this.resolvers = new Resolvers();
  }

  /**
   * Create an executable schema from the schema typeDefs in
   * combination with the type definitions
   */
  private makeSchemaExecutable() {
    this.executableSchema = makeExecutableSchema({
      resolvers: this.resolvers.resolvers,
      typeDefs: this.types,
    });
  }
}
