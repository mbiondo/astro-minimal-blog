import ArticleRepository from '@lib/article/repository'
import { type Comment, type ArticleAction, type ArticleParams, ArticleActionsType } from '@lib/article/types'

export const getComment: ArticleAction = {
  id: ArticleActionsType.ListComments,
  name: 'Get commments',
  policies: [],
  exec: async (params: ArticleParams): Promise<Comment[]> => {
    if (!params.comment.articleId) throw new Error('Article id is required')
    return await ArticleRepository.findCommentsByArticleId(params.comment.articleId)
  },
}
