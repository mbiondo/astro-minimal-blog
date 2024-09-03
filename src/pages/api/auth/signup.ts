import { lucia } from '@lib/auth/auth'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { db, eq, User } from 'astro:db'

import type { APIContext } from 'astro'

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.clone().formData()
  const email = (formData.get('email') as string).trim()
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  context.locals.formErrors = {}
  context.locals.formValues = {
    email,
    name,
  }

  if (typeof email !== 'string' || email.length < 3 || email.length > 255 || !/.+@.+\..+/.test(email)) {
    context.locals.formErrors.email = 'Invalid email address'
    return context.rewrite('/auth/signup')
  }

  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    context.locals.formErrors.password = 'Password must be at least 6 characters long'
    return context.rewrite('/auth/signup')
  }

  if (typeof name !== 'string' || name.length < 1 || name.length > 255) {
    context.locals.formErrors.name = 'Name must be at least 1 character long'
    return context.rewrite('/auth/signup')
  }

  const userId = generateId(15)
  const hashedPassword = await new Argon2id().hash(password)

  const existingUser = await db.select().from(User).where(eq(User.email, email.toLowerCase())).get()
  if (existingUser) {
    context.locals.formErrors.email = 'User already exists'
    return context.rewrite('/auth/signup')
  }

  await db.insert(User).values({
    id: userId,
    email: email.toLowerCase(),
    confirmed: false,
    name: name,
    role: 'user',
    hashed_password: hashedPassword,
  })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return context.redirect('/')
}
