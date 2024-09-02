import type { Article as LocalArticle, ArticleAction, ArticleContext, ArticleParams } from "../types"
import { db, Article, User, eq } from "astro:db"

export const listArticle: ArticleAction = {
	id: "article.list",
	name: "Create article",
	policies: [],
	exec: async (): Promise<LocalArticle[]> => {
		const result = await db.select().from(Article).innerJoin(User, eq(Article.authorId, User.id))
		return result.map((item) => {
			return {
				id: item.Article.id,
				title: item.Article.title,
				content: item.Article.content,
				authorId: item.Article.authorId,
				author: item.User && {
					id: item.User.id,
					name: item.User.name,
					email: item.User.email,
					role: item.User.role,
					confirmed: item.User.confirmed,
				},
			}
		})
	},
}
