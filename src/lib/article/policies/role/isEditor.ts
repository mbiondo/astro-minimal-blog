import type { ArticlePolicy } from '@lib/article/types'

const IsEditor: ArticlePolicy = {
  test: async (ctx): Promise<boolean> => {
    if (!ctx.user) return false
    if (!ctx.article) return false
    return (ctx.article?.editorsId || []).includes(ctx.user.id)
  },
}

export default IsEditor
