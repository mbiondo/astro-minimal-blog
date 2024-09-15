import ArticleRepository from '@lib/article/repository'
import { ArticleActionsType, type ArticleAction, type ArticleParams } from '@lib/article/types'
import CantDelete from '../policies/canDelete'

export const deleteComment: ArticleAction = {
  id: ArticleActionsType.DeleteComment,
  name: 'Delete comment',
  policies: CantDelete,
  exec: async (params: ArticleParams): Promise<boolean> => {
    if (!params.comment.id) throw new Error('Comment id is required')
    return await ArticleRepository.deleteComment(params.comment.id)
  },
}
