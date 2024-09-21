export interface UserData {
  id: string
  name: string
  email: string
  role: string
  confirmed: boolean
  avatar?: string
}

export interface ArticleData {
  id: string
  title: string
  content: string
  slug: string
  authorId: string
  updatedAt: Date
  createdAt: Date
}

export interface CommentData {
  id: string
  articleId: string
  content: string
  authorId: string
  updatedAt: Date
  createdAt: Date
}

export interface CommentResponse {
  Comment: CommentData
  User: UserData
}

export interface ArticleResponse {
  Article: ArticleData
  User: UserData
}

export interface ArticleInput {
  title: string
  content: string
  slug: string
  authorId: string
}

export interface CommentInput {
  articleId: string
  content: string
  authorId: string
}
