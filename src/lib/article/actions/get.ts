import type { Article as LocalArticle, ArticleAction, ArticleParams } from "../types"
import { db, Article, eq, User } from "astro:db"

export const getArticle: ArticleAction = {
	id: "article.get",
	name: "Get article",
	policies: [],
	exec: async (params: ArticleParams): Promise<LocalArticle> => {
		if (!params.article.id) throw new Error("Article id is required")
		const article = await db
			.select()
			.from(Article)
			.innerJoin(User, eq(Article.authorId, User.id))
			.where(eq(Article.id, params.article.id))
			.get()

		return article
			? {
					id: article.Article.id,
					title: article.Article.title,
					content: article.Article.content,
					authorId: article.Article.authorId,
					author: article.User && {
						id: article.User.id,
						name: article.User.name,
						email: article.User.email,
						role: article.User.role,
						confirmed: article.User.confirmed,
					},
				}
			: { id: "", title: "", content: "", authorId: "" }
	},
}
