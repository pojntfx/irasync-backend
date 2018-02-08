// Enable the exporting of the schema
import { makeExecutableSchema } from 'graphql-tools';
// Import the resolver class
import { Resolvers } from './resolvers';

/**
 * The API's "syntax" definition
 */
export class Schema {
  readonly types: String[]
  executableSchema: any
  resolvers: any

  constructor() {
    this.types = [`
      # A post by an author
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
        # Returns a post by it's id, which is required
        post(id: Int!): Post
        # Returns all posts
        posts: [Post]
      }
    `];
    this.createResolvers();
    this.makeSchemaExecutable();
  }

  createResolvers() {
    this.resolvers = new Resolvers();
  }

  makeSchemaExecutable() {
    this.executableSchema = makeExecutableSchema({
      typeDefs: this.types,
      resolvers: this.resolvers.resolvers
    })
  }
}