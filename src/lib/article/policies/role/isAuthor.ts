import type { ArticlePolicy } from '@lib/article/types'

const IsAuthor: ArticlePolicy = {
  test: async (ctx): Promise<boolean> => {
    if (!ctx.user) return false
    if (!ctx.article && !ctx.comment) return false
    if (ctx.comment) return ctx.user.id === ctx.comment.authorId
    return ctx.user.id === ctx.article?.authorId
  },
}

export default IsAuthor
