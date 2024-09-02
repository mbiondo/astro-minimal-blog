import type { ArticleContext, ArticleParams } from '@lib/article/types'
import type { LocalUser } from '@lib/core/types'
import { ActionManager, type IActionParam, type IContext } from '@mbiondo/actions-manager'
import type { APIContext, MiddlewareNext } from 'astro'
import { createArticle } from '@lib/article/actions/create'
import { listArticle } from '@lib/article/actions/list'
import { getArticle } from '@lib/article/actions/get'
import { editArticle } from '@lib/article/actions/edit'

export async function actionManager(
  context: APIContext<Record<string, any>, Record<string, string | undefined>>,
  next: MiddlewareNext,
) {
  const actionManager = new ActionManager<ArticleContext, ArticleParams>({
    user: context.locals.user ? (context.locals.user as LocalUser) : undefined,
  })
  actionManager.addAction(createArticle)
  actionManager.addAction(listArticle)
  actionManager.addAction(getArticle)
  actionManager.addAction(editArticle)
  context.locals.actionManager = actionManager as ActionManager<IContext, IActionParam>
  return await next()
}
