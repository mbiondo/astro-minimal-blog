import type { Article as LocalArticle, ArticleAction, ArticleParams } from '../types'
import ArticleRepository from '../repository'

import CanCreatePolicy from '../policies/canCreate'

export const createArticle: ArticleAction = {
  id: 'article.create',
  name: 'Create article',
  policies: CanCreatePolicy,
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.authorId) throw new Error('Author is required')
    const newArticle = await ArticleRepository.create({
      title: params.article.title || 'Test Article',
      content: params.article.content || 'This is a test article',
      editors: [],
      authorId: params.article.authorId,
    })
    return newArticle
  },
}
