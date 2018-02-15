import * as jwt from "jsonwebtoken";
import { Prisma } from "./generated/prisma";

/**
 * The context of the query (i.e. user meta)
 */
export interface IContext {
  db: Prisma;
  request: any;
}

/**
 * Get the user id from the context (for auth)
 * @param ctx The context of the query (i.e. user meta)
 */
export function getUserId(ctx: IContext) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string };
    return userId;
  }

  throw new AuthError();
}

/**
 * Throw error message if unauthorized user tries to access a restricted area
 */
export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
