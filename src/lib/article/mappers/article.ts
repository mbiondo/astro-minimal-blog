import type { Article } from '@lib/article/types'
import type { IMapper } from '@lib/core/interfaces/mapper'
import type { ArticleResponse } from '../repositories/types'

class ArticleMapper implements IMapper<ArticleResponse, Article> {
  map(data: ArticleResponse): Article {
    return {
      id: data.Article.id,
      title: data.Article.title,
      content: data.Article.content,
      authorId: data.Article.authorId,
      slug: data.Article.slug,
      updatedAt: data.Article.updatedAt,
      createdAt: data.Article.createdAt,
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
  mapArray(data: ArticleResponse[]): Article[] {
    return data.map((item) => this.map(item))
  }
}

export default ArticleMapper
