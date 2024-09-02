import { generateId } from 'lucia'
import type { Article as LocalArticle, ArticleAction, ArticleParams } from '../types'
import { db, Article } from 'astro:db'
import CanCreatePolicy from '../policies/canCreate'

export const createArticle: ArticleAction = {
  id: 'article.create',
  name: 'Create article',
  policies: CanCreatePolicy,
  exec: async (params: ArticleParams): Promise<LocalArticle> => {
    if (!params.article.authorId) throw new Error('Author is required')
    const articleId = generateId(15)
    const article: LocalArticle = {
      id: articleId,
      title: params.article.title || 'Test Article',
      content: params.article.content || 'This is a test article',
      editors: [],
      authorId: params.article.authorId,
    }
    await db.insert(Article).values(article)
    return article
  },
}
