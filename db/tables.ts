import { defineTable, column } from "astro:db"

export const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		email: column.text({ unique: true }),
		name: column.text(),
		role: column.text(),
		confirmed: column.boolean(),
		hashed_password: column.text(),
	},
})

export const Token = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		userId: column.text({
			references: () => User.columns.id,
		}),
		expiresAt: column.date(),
	},
})

export const Article = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		title: column.text(),
		content: column.text(),
		authorId: column.text({
			references: () => User.columns.id,
		}),
	},
})

export const Editors = defineTable({
	columns: {
		articleId: column.text({
			references: () => Article.columns.id,
		}),
		userId: column.text({
			references: () => User.columns.id,
		}),
	},
})

export const Comments = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		articleId: column.text({
			references: () => Article.columns.id,
		}),
		userId: column.text({
			references: () => User.columns.id,
		}),
		content: column.text(),
	},
})

export const Session = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		expiresAt: column.date(),
		userId: column.text({
			references: () => User.columns.id,
		}),
	},
})
