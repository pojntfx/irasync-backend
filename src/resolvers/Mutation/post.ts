import { getUserId, IContext } from "../../utils";

export const post = {
  async createDraft(parent, { title, text }, ctx: IContext, info) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createPost(
      {
        data: {
          author: {
            connect: { id: userId }
          },
          isPublished: false,
          text,
          title
        }
      },
      info
    );
  },

  async publish(parent, { id }, ctx: IContext, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.db.exists.Post({
      author: { id: userId },
      id
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.db.mutation.updatePost(
      {
        data: { isPublished: true },
        where: { id }
      },
      info
    );
  },

  async deletePost(parent, { id }, ctx: IContext, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.db.exists.Post({
      author: { id: userId },
      id
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.db.mutation.deletePost({ where: { id } });
  },

  async updatePost(parent, { id, title, text }, ctx: IContext, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.db.exists.Post({
      author: { id: userId },
      id
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.db.mutation.updatePost(
      {
        data: {
          text,
          title
        },
        where: {
          id
        }
      },
      info
    );
  }
};
