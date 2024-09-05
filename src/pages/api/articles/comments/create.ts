import type { LocalUser } from '@lib/core/types'
import type { APIContext } from 'astro'

export async function POST(context: APIContext): Promise<Response> {
  if (!context.locals.session) {
    return context.redirect('/401')
  }

  const formData = await context.request.clone().formData()
  const content = formData.get('content') as string
  const authorId = (context.locals.user as LocalUser).id
  const articleId = formData.get('articleId') as string
  const actionManager = context.locals.actionManager

  context.locals.formErrors = {}
  context.locals.formValues = {
    content,
  }

  if (!actionManager) {
    context.locals.formErrors.application = 'Error loading application'
    return context.rewrite('/articles/new')
  }

  if (!actionManager.canExecute('comment.create')) {
    context.locals.formErrors.application = 'You do not have permission to create articles'
    return context.rewrite('/401')
  }

  const result = await actionManager.execute('comment.create', {
    comment: {
      content: content,
      authorId: authorId,
      articleId: articleId,
    },
  })

  if (!result) {
    context.locals.formErrors.application = 'Error creating article'
    return context.redirect('/articles/' + articleId)
  }

  return context.redirect('/articles/' + articleId)
}
