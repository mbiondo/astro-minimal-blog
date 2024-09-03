import IsAdmin from '@lib/article/policies/role/isAdmin'
import IsAuthor from '@lib/article/policies/role/isAuthor'

const CantDelete = [[IsAdmin, IsAuthor]]

export default CantDelete
