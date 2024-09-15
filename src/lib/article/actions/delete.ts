import ArticleRepository from '@lib/article/repository'
import { ArticleActionsType, type ArticleAction, type ArticleParams } from '@lib/article/types'
import CantDelete from '../policies/canDelete'

export const deleteArticle: ArticleAction = {
  id: ArticleActionsType.Delete,
  name: 'Delete article',
  policies: CantDelete,
  exec: async (params: ArticleParams): Promise<boolean> => {
    if (!params.article.id) throw new Error('Article id is required')
    return await ArticleRepository.delete(params.article.id)
  },
}
