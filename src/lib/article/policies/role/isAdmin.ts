import type { ArticlePolicy } from '@lib/article/types'

const IsAdmin: ArticlePolicy = {
  test: async (ctx): Promise<boolean> => {
    if (!ctx.user) return false
    return ctx.user.role === 'admin'
  },
}

export default IsAdmin
