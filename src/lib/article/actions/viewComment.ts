import { type Comment, type ArticleAction, type ArticleParams, ArticleActionsType } from '@lib/article/types'
import CommentService from '../adapters/comment'

export const ViewComment: ArticleAction = {
  id: ArticleActionsType.ReadComment,
  name: 'Get comment',
  policies: [],
  exec: async (params: ArticleParams): Promise<Comment> => {
    if (!params.comment.id) throw new Error('Article id is required')
    const service = CommentService.getInstance()
    return await service.find(params.comment.id)
  },
}
