import type { ArticlePolicy } from "@lib/article/types"

const IsEditor: ArticlePolicy = {
	test: (ctx) => {
		if (!ctx.user) return false
		if (!ctx.article) return false
		return (ctx.article?.editorsId || []).includes(ctx.user.id)
	},
}

export default IsEditor
