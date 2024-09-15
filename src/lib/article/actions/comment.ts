import { ArticleActionsType, type ArticleAction, type ArticleParams, type Comment } from '../types'
import ArticleRepository from '../repository'

import CanComment from '../policies/canComment'

export const createComment: ArticleAction = {
  id: ArticleActionsType.Comment,
  name: 'Create article',
  policies: CanComment,
  exec: async (params: ArticleParams): Promise<Comment> => {
    if (!params.comment.authorId) throw new Error('Author is required')
    if (!params.comment.articleId) throw new Error('Article is required')

    const newComment = await ArticleRepository.createComment({
      content: params.comment.content || 'This is a test article',
      articleId: params.comment.articleId,
      authorId: params.comment.authorId,
    })

    return newComment
  },
}
