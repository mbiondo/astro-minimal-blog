import type { ArticlePolicy } from "@lib/article/types"
import IsAdmin from "@lib/article/policies/role/isAdmin"
import IsAuthor from "@lib/article/policies/role/isAuthor"
import IsEditor from "@lib/article/policies/role/isEditor"

const CanEditPolicy: ArticlePolicy[][] = [[IsAdmin, IsAuthor, IsEditor]]
export default CanEditPolicy
