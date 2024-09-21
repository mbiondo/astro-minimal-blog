import { ArticleActionsType, type ArticleAction, type ArticleParams, type Comment } from '../types'

import CanComment from '../policies/canComment'
import CommentService from '../adapters/comment'

export const CreateComment: ArticleAction = {
  id: ArticleActionsType.Comment,
  name: 'Create comment',
  policies: CanComment,
  exec: async (params: ArticleParams): Promise<Comment> => {
    if (!params.comment.authorId) throw new Error('Author is required')
    if (!params.comment.articleId) throw new Error('Article is required')
    const service = CommentService.getInstance()

    const newComment = await service.create({
      content: params.comment.content || 'This is a test article',
      articleId: params.comment.articleId,
      authorId: params.comment.authorId,
    })

    return newComment
  },
}
