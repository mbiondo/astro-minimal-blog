import { sequence } from 'astro:middleware'
import { auth } from './auth'
import { actionManager } from './action-manager'

export const onRequest = sequence(auth, actionManager)
