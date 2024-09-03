import type { LocalUser } from '@lib/core/types'
import type { APIContext } from 'astro'

export async function POST(context: APIContext): Promise<Response> {
  if (!context.locals.session) {
    return context.redirect('/auth/login')
  }

  const formData = await context.request.clone().formData()
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const authorId = (context.locals.user as LocalUser).id
  const actionManager = context.locals.actionManager

  context.locals.formErrors = {}
  context.locals.formValues = {
    title,
    content,
  }

  if (!actionManager) {
    context.locals.formErrors.application = 'Error loading application'
    return context.rewrite('/articles/new')
  }

  if (!actionManager.canExecute('article.create')) {
    context.locals.formErrors.application = 'You do not have permission to create articles'
    return context.rewrite('/401')
  }

  const result = await actionManager.execute('article.create', {
    article: {
      title: title,
      content: content,
      authorId: authorId,
    },
  })

  if (!result) {
    context.locals.formErrors.application = 'Error creating article'
    return context.rewrite('/articles/new')
  }

  return context.redirect('/')
}
