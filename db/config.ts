import { defineDb } from 'astro:db'
import { Session, User, Token, Article, Comment, Editor } from './tables'

export default defineDb({
  tables: {
    Session,
    User,
    Token,
    Article,
    Comment,
    Editor,
  },
})
