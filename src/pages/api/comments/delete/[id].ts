import { ArticleActionsType, type Comment } from '@lib/article/types'
import type { APIContext } from 'astro'

export async function POST(context: APIContext): Promise<Response> {
  if (!context.locals.session) {
    return new Response(null, {
      status: 401,
    })
  }

  const { id } = context.params

  const actionManager = context.locals.actionManager

  if (!actionManager) {
    return new Response(null, {
      status: 500,
    })
  }

  const comment: Comment = await actionManager.execute(ArticleActionsType.ReadComment, { comment: { id } })

  actionManager.setContext({ ...actionManager.getContext(), comment })

  actionManager.execute(ArticleActionsType.DeleteComment, { comment: { id } })

  return context.redirect(`/`)
}
