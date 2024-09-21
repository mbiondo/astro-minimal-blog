import { ArticleActionsType, type ArticleAction, type ArticleParams } from '@lib/article/types'
import CantDelete from '../policies/canDelete'
import CommentService from '../adapters/comment'

export const deleteComment: ArticleAction = {
  id: ArticleActionsType.DeleteComment,
  name: 'Delete comment',
  policies: CantDelete,
  exec: async (params: ArticleParams): Promise<boolean> => {
    if (!params.comment.id) throw new Error('Comment id is required')
    const service = CommentService.getInstance()
    return await service.delete(params.comment.id)
  },
}
