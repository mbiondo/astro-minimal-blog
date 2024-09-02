import { defineDb } from 'astro:db'
import { Session, User, Token, Article, Comments, Editors } from './tables'

export default defineDb({
  tables: {
    Session,
    User,
    Token,
    Article,
    Comments,
    Editors,
  },
})
