import {
  type Article as LocalArticle,
  type ArticleAction,
  type ArticleParams,
  ArticleActionsType,
} from '@lib/article/types'
import ArticleService from '../adapters/article'

export const ViewArticle: ArticleAction = {
  id: ArticleActionsType.Read,
  name: 'Get article',
  policies: [],
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.slug && !params.article.id) throw new Error('Article id or slug is required')
    const service = ArticleService.getInstance()
    return params.article.id
      ? await service.find(params.article.id)
      : await service.findBySlug(params.article.slug as string)
  },
}
