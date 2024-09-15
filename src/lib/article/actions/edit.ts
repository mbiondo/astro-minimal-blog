import { type Article as LocalArticle, type ArticleAction, type ArticleParams, ArticleActionsType } from '../types'

import CanEditPolicy from '@lib/article/policies/canEdit'
import ArticleRepository from '@lib/article/repository'

export const editArticle: ArticleAction = {
  id: ArticleActionsType.Update,
  name: 'Edit article',
  policies: CanEditPolicy,
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.id) throw new Error('Article id is required')

    const article = await ArticleRepository.update({
      id: params.article.id,
      title: params.article.title || 'Test Article',
      content: params.article.content || 'This is a test article',
      authorId: params.article.authorId || '1',
      slug: params.article.slug || 'test-article',
    })

    return article
  },
}
