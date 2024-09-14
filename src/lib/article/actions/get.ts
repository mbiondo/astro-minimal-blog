import ArticleRepository from '@lib/article/repository'
import type { Article as LocalArticle, ArticleAction, ArticleParams } from '@lib/article/types'

export const getArticle: ArticleAction = {
  id: 'article.get',
  name: 'Get article',
  policies: [],
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.slug && !params.article.id) throw new Error('Article id or slug is required')
    return params.article.id
      ? await ArticleRepository.findById(params.article.id)
      : await ArticleRepository.findBySlug(params.article.slug as string)
  },
}
