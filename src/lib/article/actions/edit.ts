import { type Article as LocalArticle, type ArticleAction, type ArticleParams, ArticleActionsType } from '../types'

import CanEditPolicy from '@lib/article/policies/canEdit'

import ArticleService from '../adapters/article'

export const EditArticle: ArticleAction = {
  id: ArticleActionsType.Update,
  name: 'Edit article',
  policies: CanEditPolicy,
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.id) throw new Error('Article id is required')
    const service = ArticleService.getInstance()
    const article = await service.update(params.article.id, {
      title: params.article.title || 'Test Article',
      content: params.article.content || 'This is a test article',
      authorId: params.article.authorId || '1',
      slug: params.article.slug || 'test-article',
    })
    return article
  },
}
