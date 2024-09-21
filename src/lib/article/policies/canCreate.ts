import type { ArticlePolicy } from '../types'

const CanCreatePolicy: ArticlePolicy = {
  test: async (ctx): Promise<boolean> => {
    if (!ctx.user) return false
    if (!ctx.user.confirmed) return false
    return ctx.user.role === 'user' || ctx.user.role === 'admin'
  },
}

export default CanCreatePolicy
