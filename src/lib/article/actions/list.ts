import ArticleService from '../adapters/article'

import { type Article as LocalArticle, type ArticleAction, ArticleActionsType } from '../types'

export const ListArticles: ArticleAction = {
  id: ArticleActionsType.List,
  name: 'Create article',
  policies: [],
  exec: async (): Promise<LocalArticle[]> => {
    const service = ArticleService.getInstance()
    return await service.findAll()
  },
}
