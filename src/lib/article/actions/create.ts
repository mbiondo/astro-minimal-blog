import { type Article as LocalArticle, type ArticleAction, type ArticleParams, ArticleActionsType } from '../types'

import CanCreatePolicy from '../policies/canCreate'
import ArticleService from '../adapters/article'

export const CreateArticle: ArticleAction = {
  id: ArticleActionsType.Create,
  name: 'Create article',
  policies: CanCreatePolicy,
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.authorId) throw new Error('Author is required')
    const service = ArticleService.getInstance()

    const newArticle = await service.create({
      title: params.article.title || 'Test Article',
      content: params.article.content || 'This is a test article',
      authorId: params.article.authorId,
      slug: params.article.slug || 'test-article',
    })

    return newArticle
  },
}
