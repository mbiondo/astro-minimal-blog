import type { APIContext, MiddlewareNext } from 'astro'

export async function form(
  context: APIContext<Record<string, any>, Record<string, string | undefined>>,
  next: MiddlewareNext,
) {
  return await next()
}
