import type { IRepository, IRepositoryResponse } from '@lib/core/interfaces/repository'
import type { CommentInput, CommentResponse } from './types'

import { db, Comment, User, eq } from 'astro:db'
import { generateId } from 'lucia'

class CommentRepository implements IRepository<CommentInput, CommentResponse> {
  async findAll(): Promise<IRepositoryResponse<CommentResponse>> {
    const result = await db.select().from(Comment).innerJoin(User, eq(Comment.authorId, User.id))
    if (result) {
      return {
        data: result,
      }
    } else {
      return {
        error: 'No comments found',
      }
    }
  }

  async find(id: string): Promise<IRepositoryResponse<CommentResponse>> {
    const comment = await db
      .select()
      .from(Comment)
      .innerJoin(User, eq(Comment.authorId, User.id))
      .where(eq(Comment.id, id))
      .get()

    if (!comment) {
      return {
        error: 'Comment not found',
      }
    }

    return {
      data: comment,
    }
  }

  async create(comment: CommentInput): Promise<IRepositoryResponse<CommentResponse>> {
    try {
      const id = generateId(15)
      const createdAt = new Date()
      const updatedAt = new Date()
      await db.insert(Comment).values({ id, ...comment, createdAt, updatedAt })
      return {
        data: {
          Comment: {
            id,
            ...comment,
            createdAt,
            updatedAt,
          },
          User: { id: '', name: '', email: '', role: '', confirmed: false },
        },
      }
    } catch (error) {
      return {
        error: 'Could not create comment',
      }
    }
  }

  async update(id: string, comment: CommentInput): Promise<IRepositoryResponse<CommentResponse>> {
    try {
      const updatedAt = new Date()

      const result = await db
        .update(Comment)
        .set({ ...comment, updatedAt })
        .where(eq(Comment.id, id))

      if (!result) {
        return {
          error: 'Could not update comment',
        }
      }

      return {
        data: {
          Comment: {
            id,
            ...comment,
            updatedAt,
            createdAt: new Date(),
          },
          User: { id: '', name: '', email: '', role: '', confirmed: false },
        },
      }
    } catch (error) {
      return {
        error: 'Could not update comment',
      }
    }
  }

  async delete(id: string): Promise<boolean> {
    return true
  }

  async findByArticleId(articleId: string): Promise<IRepositoryResponse<CommentResponse>> {
    const comments = await db
      .select()
      .from(Comment)
      .innerJoin(User, eq(Comment.authorId, User.id))
      .where(eq(Comment.articleId, articleId))

    if (!comments) {
      return {
        error: 'No comments found',
      }
    }

    return {
      data: comments,
    }
  }
}

export default CommentRepository
