import type { ArticlePolicy } from '@lib/article/types'

const CanComment: ArticlePolicy = {
  test: async (ctx): Promise<boolean> => {
    if (!ctx.user) return false

    return ctx.user.confirmed
  },
}

export default CanComment
