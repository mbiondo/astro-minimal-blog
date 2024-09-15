import ArticleRepository from '../repository'
import { type Article as LocalArticle, type ArticleAction, ArticleActionsType } from '../types'

export const listArticle: ArticleAction = {
  id: ArticleActionsType.List,
  name: 'Create article',
  policies: [],
  exec: async (): Promise<LocalArticle[]> => {
    return await ArticleRepository.findAll()
  },
}
