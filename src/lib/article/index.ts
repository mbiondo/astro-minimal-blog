import { CreateArticle } from '@lib/article/actions/create'
import { ListArticles } from '@lib/article/actions/list'
import { ViewArticle } from '@lib/article/actions/view'
import { EditArticle } from '@lib/article/actions/edit'
import { DeleteArticle } from '@lib/article/actions/delete'
import { CreateComment } from './actions/createComment'
import { deleteComment } from './actions/deleteComment'
import { ViewComment } from './actions/viewComment'
import { ListComments } from './actions/listComments'

const ArticleActions = [
  CreateArticle,
  ListArticles,
  ViewArticle,
  EditArticle,
  DeleteArticle,
  ViewComment,
  CreateComment,
  deleteComment,
  ListComments,
]

export default ArticleActions
