import type { LocalUser } from '@lib/core/types'
import type { APIContext } from 'astro'

export async function POST(context: APIContext): Promise<Response> {
  if (!context.locals.session) {
    return new Response(null, {
      status: 401,
    })
  }

  const formData = await context.request.formData()
  const title = formData.get('title')
  const content = formData.get('content')
  const authorId = (context.locals.user as LocalUser).id
  const actionManager = context.locals.actionManager

  if (!actionManager) {
    return new Response(null, {
      status: 500,
    })
  }

  if (!actionManager.canExecute('article.create'))
    return new Response(null, {
      status: 403,
    })

  const result = await actionManager.execute('article.create', {
    article: {
      title: title as string,
      content: content as string,
      authorId: authorId,
    },
  })

  if (!result) {
    return new Response(null, {
      status: 500,
    })
  }

  return context.redirect('/')
}
