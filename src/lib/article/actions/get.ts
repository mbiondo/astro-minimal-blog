import ArticleRepository from '@lib/article/repository'
import {
  type Article as LocalArticle,
  type ArticleAction,
  type ArticleParams,
  ArticleActionsType,
} from '@lib/article/types'

export const getArticle: ArticleAction = {
  id: ArticleActionsType.Read,
  name: 'Get article',
  policies: [],
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.slug && !params.article.id) throw new Error('Article id or slug is required')
    return params.article.id
      ? await ArticleRepository.findById(params.article.id)
      : await ArticleRepository.findBySlug(params.article.slug as string)
  },
}
