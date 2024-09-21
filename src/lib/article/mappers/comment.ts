import type { Comment } from '@lib/article/types'
import type { IMapper } from '@lib/core/interfaces/mapper'
import type { CommentResponse } from '../repositories/types'

class CommentMapper implements IMapper<CommentResponse, Comment> {
  mapArray(data: CommentResponse[]): Comment[] {
    return data.map((item) => this.map(item))
  }

  map(data: CommentResponse): Comment {
    return {
      id: data.Comment.id,
      articleId: data.Comment.articleId,
      content: data.Comment.content,
      authorId: data.Comment.authorId,
      updatedAt: data.Comment.updatedAt,
      createdAt: data.Comment.createdAt,
      author: {
        id: data.User.id,
        name: data.User.name,
        email: data.User.email,
        role: data.User.role,
        confirmed: data.User.confirmed,
        avatar: data.User.avatar,
      },
    }
  }
}

export default CommentMapper
