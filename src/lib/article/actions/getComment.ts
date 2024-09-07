import ArticleRepository from '@lib/article/repository'
import type { Comment, ArticleAction, ArticleParams } from '@lib/article/types'

export const getComment: ArticleAction = {
  id: 'comment.get',
  name: 'Get article',
  policies: [],
  exec: async (params: ArticleParams): Promise<Comment> => {
    if (!params.comment.id) throw new Error('Article id is required')
    return await ArticleRepository.findCommentById(params.comment.id)
  },
}
