import ArticleRepository from '@lib/article/repository'
import type { ArticleAction, ArticleParams } from '@lib/article/types'
import CantDelete from '../policies/canDelete'

export const deleteArticle: ArticleAction = {
  id: 'article.delete',
  name: 'Delete article',
  policies: CantDelete,
  exec: async (params: ArticleParams): Promise<boolean> => {
    if (!params.article.id) throw new Error('Article id is required')
    return await ArticleRepository.delete(params.article.id)
  },
}
