import { ArticleActionsType, type ArticleAction, type ArticleParams } from '@lib/article/types'
import CantDelete from '../policies/canDelete'
import ArticleService from '../adapters/article'

export const DeleteArticle: ArticleAction = {
  id: ArticleActionsType.Delete,
  name: 'Delete article',
  policies: CantDelete,
  exec: async (params: ArticleParams): Promise<boolean> => {
    if (!params.article.id) throw new Error('Article id is required')
    const service = ArticleService.getInstance()
    return await service.delete(params.article.id)
  },
}
