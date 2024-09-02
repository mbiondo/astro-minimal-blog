import type { Article as LocalArticle, ArticleAction, ArticleParams } from "../types"
import { db, Article, eq } from "astro:db"
import CanEditPolicy from "../policies/canEdit"

export const editArticle: ArticleAction = {
	id: "article.edit",
	name: "Edit article",
	policies: CanEditPolicy,
	exec: async (params: ArticleParams): Promise<LocalArticle> => {
		if (!params.article.id) throw new Error("Article id is required")

		const updatedCar: LocalArticle[] = await db
			.update(Article)
			.set({
				title: params.article.title,
				content: params.article.content,
			})
			.where(eq(Article.id, params.article.id))
			.returning()

		return updatedCar[0]
	},
}
