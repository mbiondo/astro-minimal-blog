import type { Article } from '@lib/article/types'
import type { APIContext } from 'astro'

export async function POST(context: APIContext): Promise<Response> {
  if (!context.locals.session) {
    return new Response(null, {
      status: 401,
    })
  }

  const { id } = context.params

  const formData = await context.request.formData()
  const title = formData.get('title')
  const content = formData.get('content')
  const actionManager = context.locals.actionManager

  if (!actionManager) {
    return new Response(null, {
      status: 500,
    })
  }

  const article: Article = await actionManager.execute('article.get', { article: { id } })

  actionManager.setContext({ ...actionManager.getContext(), article })

  await actionManager.execute('article.edit', {
    article: {
      id: id as string,
      title: title as string,
      content: content as string,
    },
  })

  return context.redirect(`/articles/${id}`)
}
