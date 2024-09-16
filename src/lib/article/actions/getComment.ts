import ArticleRepository from '@lib/article/repository'
import { type Comment, type ArticleAction, type ArticleParams, ArticleActionsType } from '@lib/article/types'

export const getComment: ArticleAction = {
  id: ArticleActionsType.ReadComment,
  name: 'Get comment',
  policies: [],
  exec: async (params: ArticleParams): Promise<Comment> => {
    if (!params.comment.id) throw new Error('Article id is required')
    return await ArticleRepository.findCommentById(params.comment.id)
  },
}
