import ArticleRepository from '@lib/article/repository'
import type { Article as LocalArticle, ArticleAction, ArticleParams } from '@lib/article/types'

export const getArticle: ArticleAction = {
  id: 'article.get',
  name: 'Get article',
  policies: [],
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.id) throw new Error('Article id is required')
    return await ArticleRepository.findById(params.article.id)
  },
}
