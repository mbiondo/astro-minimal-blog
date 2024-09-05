import type { Article as LocalArticle, Comment as LocalComment } from '../types'
import { generateId } from 'lucia'
import { db, Article, User, eq, Comment } from 'astro:db'

type LocalArticlePartial = Omit<LocalArticle, 'id'>

class ArticleRepository {
  static async findAll(): Promise<LocalArticle[]> {
    const result = await db.select().from(Article).innerJoin(User, eq(Article.authorId, User.id))
    return result.map((item) => {
      return {
        id: item.Article.id,
        title: item.Article.title,
        content: item.Article.content,
        authorId: item.Article.authorId,
        author: item.User && {
          id: item.User.id,
          name: item.User.name,
          email: item.User.email,
          avatar: item.User.avatar,
          role: item.User.role,
          confirmed: item.User.confirmed,
        },
      }
    })
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
      ? {
          id: article.Article.id,
          title: article.Article.title,
          content: article.Article.content,
          authorId: article.Article.authorId,
          comments: comments.map((comment) => ({
            id: comment.Comment.id,
            articleId: comment.Comment.articleId,
            authorId: comment.Comment.authorId,
            content: comment.Comment.content,
            author: {
              id: comment.User.id,
              name: comment.User.name,
              avatar: comment.User.avatar,
              email: comment.User.email,
              role: comment.User.role,
              confirmed: comment.User.confirmed,
            },
          })),
          author: article.User && {
            id: article.User.id,
            name: article.User.name,
            avatar: article.User.avatar,
            email: article.User.email,
            role: article.User.role,
            confirmed: article.User.confirmed,
          },
        }
      : { id: '', title: '', content: '', authorId: '' }
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
