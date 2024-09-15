import { type Article as LocalArticle, type ArticleAction, type ArticleParams, ArticleActionsType } from '../types'
import ArticleRepository from '../repository'
import CanCreatePolicy from '../policies/canCreate'

export const createArticle: ArticleAction = {
  id: ArticleActionsType.Create,
  name: 'Create article',
  policies: CanCreatePolicy,
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.authorId) throw new Error('Author is required')
    const newArticle = await ArticleRepository.create({
      title: params.article.title || 'Test Article',
      content: params.article.content || 'This is a test article',
      editors: [],
      authorId: params.article.authorId,
      slug: params.article.slug || 'test-article',
    })
    return newArticle
  },
}
