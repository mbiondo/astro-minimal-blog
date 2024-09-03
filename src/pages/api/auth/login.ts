import { lucia } from '@lib/auth/auth'
import { Argon2id } from 'oslo/password'
import { db, User, eq } from 'astro:db'
import type { APIContext } from 'astro'

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.clone().formData()
  const email = (formData.get('email') as string).trim()
  const password = formData.get('password') as string

  context.locals.formErrors = {}
  context.locals.formValues = {
    email,
  }

  if (typeof email !== 'string' || email.length < 3 || email.length > 255 || !/.+@.+\..+/.test(email)) {
    context.locals.formErrors.email = 'Invalid email address'
    return context.rewrite('/auth/login')
  }

  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    context.locals.formErrors.password = 'Password must be at least 6 characters long'
    return context.rewrite('/auth/login')
  }

  const existingUser = await db.select().from(User).where(eq(User.email, email.toLowerCase())).get()

  if (!existingUser) {
    context.locals.formErrors.email = 'User not found'
    return context.rewrite('/auth/login')
  }

  const validPassword = await new Argon2id().verify(existingUser.hashed_password, password)

  if (!validPassword) {
    context.locals.formErrors.password = 'Invalid password'
    return context.rewrite('/auth/login')
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return context.redirect('/')
}
