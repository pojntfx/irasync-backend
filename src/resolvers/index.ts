import { AuthPayload } from "./AuthPayload";
import { auth } from "./Mutation/auth";
import { post } from "./Mutation/post";
import { Query } from "./Query";

/**
 * Export all the resolvers for use by Prisma
 */
export default {
  AuthPayload,
  Mutation: {
    ...auth,
    ...post,
  },
  Query,
};
