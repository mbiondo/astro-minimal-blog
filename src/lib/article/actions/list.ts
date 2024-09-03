import ArticleRepository from '../repository'
import type { Article as LocalArticle, ArticleAction } from '../types'

export const listArticle: ArticleAction = {
  id: 'article.list',
  name: 'Create article',
  policies: [],
  exec: async (): Promise<LocalArticle[]> => {
    return await ArticleRepository.findAll()
  },
}
