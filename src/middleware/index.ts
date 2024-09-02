import { sequence } from 'astro:middleware'
import { auth } from './auth'
import { actionManager } from './action-manager'
import { form } from './form'

export const onRequest = sequence(form, auth, actionManager)
