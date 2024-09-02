import type { ArticlePolicy } from '@lib/article/types'

const IsAdmin: ArticlePolicy = {
  test: (ctx) => {
    if (!ctx.user) return false
    return ctx.user.role === 'admin'
  },
}

export default IsAdmin
