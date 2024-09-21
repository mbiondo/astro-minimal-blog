import { type Comment, type ArticleAction, type ArticleParams, ArticleActionsType } from '@lib/article/types'
import CommentService from '../adapters/comment'

export const ListComments: ArticleAction = {
  id: ArticleActionsType.ListComments,
  name: 'Get commments',
  policies: [],
  exec: async (params: ArticleParams): Promise<Comment[]> => {
    if (!params.article.id) throw new Error('Article id is required')
    const service = CommentService.getInstance()
    return await service.findByArticleId(params.article.id)
  },
}
