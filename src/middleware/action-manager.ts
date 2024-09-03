import type { ArticleContext, ArticleParams } from '@lib/article/types'
import type { LocalUser } from '@lib/core/types'
import { ActionManager, type IActionParam, type IContext } from '@mbiondo/actions-manager'
import type { APIContext, MiddlewareNext } from 'astro'
import ArticleActions from '@lib/article'

export async function actionManager(
  context: APIContext<Record<string, any>, Record<string, string | undefined>>,
  next: MiddlewareNext,
) {
  const actionManager = new ActionManager<ArticleContext, ArticleParams>({
    user: context.locals.user ? (context.locals.user as LocalUser) : undefined,
  })

  actionManager.setActions(ArticleActions)

  context.locals.actionManager = actionManager as ActionManager<IContext, IActionParam>

  return await next()
}
