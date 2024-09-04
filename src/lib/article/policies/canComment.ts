import type { ArticlePolicy } from '@lib/article/types'

const CanComment: ArticlePolicy = {
  test: (ctx) => {
    if (!ctx.user) return false

    return ctx.user.confirmed
  },
}

export default CanComment
