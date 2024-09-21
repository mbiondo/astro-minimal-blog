import type { IRepository, IRepositoryResponse } from '@lib/core/interfaces/repository'
import type { ArticleInput, ArticleResponse } from './types'

import { db, Article, User, eq } from 'astro:db'
import { generateId } from 'lucia'

class ArticleRepository implements IRepository<ArticleInput, ArticleResponse> {
  async findAll(): Promise<IRepositoryResponse<ArticleResponse>> {
    const result = await db.select().from(Article).innerJoin(User, eq(Article.authorId, User.id))
    if (result) {
      return {
        data: result,
      }
    } else {
      return {
        error: 'No articles found',
      }
    }
  }

  async findBySlug(slug: string): Promise<IRepositoryResponse<ArticleResponse>> {
    const article = await db
      .select()
      .from(Article)
      .innerJoin(User, eq(Article.authorId, User.id))
      .where(eq(Article.slug, slug))
      .get()

    if (!article) {
      return {
        error: 'Article not found',
      }
    }

    return {
      data: article,
    }
  }

  async find(id: string): Promise<IRepositoryResponse<ArticleResponse>> {
    const article = await db
      .select()
      .from(Article)
      .innerJoin(User, eq(Article.authorId, User.id))
      .where(eq(Article.id, id))
      .get()

    if (!article) {
      return {
        error: 'Article not found',
      }
    }

    return {
      data: article,
    }
  }

  async create(article: ArticleInput): Promise<IRepositoryResponse<ArticleResponse>> {
    try {
      const id = generateId(15)
      const createdAt = new Date()
      const updatedAt = new Date()
      await db.insert(Article).values({ id, ...article, createdAt, updatedAt })
      return {
        data: {
          Article: {
            id,
            ...article,
            createdAt,
            updatedAt,
            authorId: article.authorId,
          },
          User: {
            id: article.authorId,
            name: '',
            email: '',
            role: '',
            confirmed: false,
          },
        },
      }
    } catch (error) {
      return {
        error: 'Could not create article',
      }
    }
  }

  async update(id: string, article: ArticleInput): Promise<IRepositoryResponse<ArticleResponse>> {
    try {
      const updatedAt = new Date()

      const result = await db
        .update(Article)
        .set({
          title: article.title,
          content: article.content,
          updatedAt,
        })
        .where(eq(Article.id, id))
        .returning()

      return {
        data: {
          Article: {
            ...result[0],
          },
          User: {
            id: article.authorId,
            name: '',
            email: '',
            role: '',
            confirmed: false,
          },
        },
      }
    } catch (error) {
      return {
        error: 'Could not update article',
      }
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await db.delete(Article).where(eq(Article.id, id))
      return true
    } catch (error) {
      return false
    }
  }
}

export default ArticleRepository
