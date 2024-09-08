import { db, User, Article } from 'astro:db'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'

// https://astro.build/db/seed

const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD
const ADMIN_EMAIL = import.meta.env.ADMIN_EMAIL
const ADMIN_NAME = import.meta.env.ADMIN_NAME

export default async function seed() {
  if (!ADMIN_PASSWORD || !ADMIN_EMAIL || !ADMIN_NAME) {
    console.error('Missing ADMIN_USER, ADMIN_PASSWORD, ADMIN_EMAIL, or ADMIN_NAME in .env')
    return
  }

  if (typeof ADMIN_PASSWORD !== 'string' || ADMIN_PASSWORD.length < 6 || ADMIN_PASSWORD.length > 255) {
    console.error('ADMIN_PASSWORD must be a string with a length between 6 and 255 characters')
    return
  }

  const userId = generateId(15)

  await db.insert(User).values([
    {
      id: userId,
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      hashed_password: await new Argon2id().hash(ADMIN_PASSWORD),
      role: 'admin',
      confirmed: true,
      avatar: 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_7.png',
    },
  ])

  await db.insert(Article).values([
    {
      id: generateId(15),
      authorId: userId,
      title: 'Welcome to Astro 🚀',
      content: `
# Welcome to Astro
This is a sample article to help you get started with Astro.

## Getting Started
To get started with Astro, you can use the following commands:

\`\`\`sh
npm install
npm run dev
\`\`\` 
`,
    },
  ])

  console.log('Admin user created')
}
