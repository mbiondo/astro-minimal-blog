/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    session: import('lucia').Session | null
    user: Omit<import('astro:db').User, 'hashed_password'> | null
    actionManager: import('@mbiondo/actions-manager').ActionManager
    theme: 'light' | 'dracula'
  }
}
