import { IContext } from '../utils'

export const AuthPayload = {
  user: async ({ user: { id } }, args, ctx: IContext, info) => {
    return ctx.db.query.user({ where: { id } }, info)
  },
}
