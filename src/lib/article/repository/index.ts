import type { Article as LocalArticle, Comment as LocalComment } from '../types'
import { generateId } from 'lucia'
import { db, Article, User, eq, Comment } from 'astro:db'
import ArticleAdapter from '../adapters/article'

type LocalArticlePartial = Omit<LocalArticle, 'id'>

class ArticleRepository {
  static async findAll(): Promise<LocalArticle[]> {
    const result = await db.select().from(Article).innerJoin(User, eq(Article.authorId, User.id))
    return ArticleAdapter.mapArray(result)
  }

  static async findBySlug(slug: string): Promise<LocalArticle> {
    const article = await db
      .select()
      .from(Article)
      .innerJoin(User, eq(Article.authorId, User.id))
      .where(eq(Article.slug, slug))
      .get()

    if (!article) return { id: '', title: '', content: '', authorId: '', slug: '' }

    const comments = await db
      .select()
      .from(Comment)
      .innerJoin(User, eq(Comment.authorId, User.id))
      .where(eq(Comment.articleId, article.Article.id))

    return article
      ? ArticleAdapter.map({ ...article, Comments: comments })
      : { id: '', title: '', content: '', authorId: '', slug: '' }
  }

  static async findById(id: string): Promise<LocalArticle> {
    const article = await db
      .select()
      .from(Article)
      .innerJoin(User, eq(Article.authorId, User.id))
      .where(eq(Article.id, id))
      .get()
    const comments = await db
      .select()
      .from(Comment)
      .innerJoin(User, eq(Comment.authorId, User.id))
      .where(eq(Comment.articleId, id))

    return article
      ? ArticleAdapter.map({ ...article, Comments: comments })
      : { id: '', title: '', content: '', authorId: '', slug: '' }
  }

  static async create(article: LocalArticlePartial): Promise<LocalArticle> {
    try {
      const id = generateId(15)
      await db.insert(Article).values({ id, ...article })
      return { id, ...article }
    } catch (error) {
      throw new Error('Failed to create article')
    }
  }

  static async update(article: LocalArticle): Promise<LocalArticle> {
    const updatedArticle: LocalArticle[] = await db
      .update(Article)
      .set({
        title: article.title,
        content: article.content,
      })
      .where(eq(Article.id, article.id))
      .returning()
    return updatedArticle[0]
  }

  static async delete(id: string): Promise<boolean> {
    await db.delete(Article).where(eq(Article.id, id))
    return true
  }

  static async findCommentById(id: string): Promise<LocalComment> {
    const comment = await db
      .select()
      .from(Comment)
      .innerJoin(User, eq(Comment.authorId, User.id))
      .where(eq(Comment.id, id))
      .get()

    return comment ? ArticleAdapter.mapComment(comment) : { id: '', articleId: '', authorId: '', content: '' }
  }

  static async deleteComment(id: string): Promise<boolean> {
    await db.delete(Comment).where(eq(Comment.id, id))
    return true
  }

  static async createComment(comment: Omit<LocalComment, 'id'>): Promise<LocalComment> {
    const commentCreated: LocalComment = {
      id: generateId(15),
      articleId: comment.articleId,
      authorId: comment.authorId,
      content: comment.content,
    }
    await db.insert(Comment).values(commentCreated)
    return commentCreated
  }
}

export default ArticleRepository
