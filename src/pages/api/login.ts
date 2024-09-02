import { lucia } from '@lib/auth/auth'
import { Argon2id } from 'oslo/password'
import { db, User, eq } from 'astro:db'
import type { APIContext } from 'astro'

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()
  const email = (formData.get('email') as string).trim()
  const password = formData.get('password') as string

  context.locals.formErrors = {}
  context.locals.formValues = {
    email,
    password,
  }
  context.cookies.set('formValues', JSON.stringify(context.locals.formValues))

  if (typeof email !== 'string' || email.length < 3 || email.length > 255 || !/.+@.+\..+/.test(email)) {
    return context.redirect('/auth/login')
  }

  if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
    return context.redirect('/auth/login')
  }

  const existingUser = await db.select().from(User).where(eq(User.email, email.toLowerCase())).get()

  if (!existingUser) {
    return context.redirect('/auth/login')
  }

  const validPassword = await new Argon2id().verify(existingUser.hashed_password, password)

  if (!validPassword) {
    return context.redirect('/auth/login')
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return context.redirect('/')
}
