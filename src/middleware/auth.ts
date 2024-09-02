import type { APIContext, MiddlewareNext } from 'astro'
import { lucia } from '../lib/auth/auth'
import { verifyRequestOrigin } from 'lucia'
import { db, eq, User } from 'astro:db'

export async function auth(
  context: APIContext<Record<string, any>, Record<string, string | undefined>>,
  next: MiddlewareNext,
) {
  if (context.request.method !== 'GET') {
    const originHeader = context.request.headers.get('Origin')
    const hostHeader = context.request.headers.get('Host')
    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      return new Response(null, {
        status: 403,
      })
    }
  }

  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) {
    context.locals.user = null
    context.locals.session = null

    return next()
  }

  const { session, user } = await lucia.validateSession(sessionId)
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id)
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie()
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  }
  if (!user) {
    context.cookies.delete(lucia.sessionCookieName)
  }
  if (user) {
    const userFinded = await db.select().from(User).where(eq(User.id, user.id)).get()
    if (userFinded) {
      const { hashed_password, ...userWithoutPassword } = userFinded
      context.locals.user = userWithoutPassword
      context.locals.session = session
    }
  }
  return await next()
}
