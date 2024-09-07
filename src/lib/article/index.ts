import { createArticle } from '@lib/article/actions/create'
import { listArticle } from '@lib/article/actions/list'
import { getArticle } from '@lib/article/actions/get'
import { editArticle } from '@lib/article/actions/edit'
import { deleteArticle } from '@lib/article/actions/delete'
import { createComment } from './actions/comment'
import { deleteComment } from './actions/deleteComment'
import { getComment } from './actions/getComment'

const ArticleActions = [
  createArticle,
  listArticle,
  getArticle,
  editArticle,
  deleteArticle,
  getComment,
  createComment,
  deleteComment,
]

export default ArticleActions
