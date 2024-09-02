import type { ArticlePolicy } from '@lib/article/types'

const IsAuthor: ArticlePolicy = {
  test: (ctx) => {
    if (!ctx.user) return false
    if (!ctx.article) return false
    return ctx.user.id === ctx.article?.authorId
  },
}

export default IsAuthor
