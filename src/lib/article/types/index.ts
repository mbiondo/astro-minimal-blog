import type { IAction, IActionParam, IContext, IPolicy } from "@mbiondo/actions-manager"
import type { LocalUser } from "@lib/core/types"

interface Article {
	id: string
	title: string
	content: string
	authorId: string
	author?: LocalUser
	editorsId?: string[]
	editors?: LocalUser[]
}

interface ArticleContext extends IContext {
	article?: Article
	user?: LocalUser
}

interface ArticleParams extends IActionParam {
	article: Partial<Article>
}

type ArticleAction = IAction<ArticleContext, ArticleParams>

type ArticlePolicy = IPolicy<ArticleContext>

export type { Article, ArticleContext, ArticleParams, ArticleAction, ArticlePolicy }
