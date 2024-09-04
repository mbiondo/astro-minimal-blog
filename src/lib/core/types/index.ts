interface LocalUser {
  id: string
  name: string
  email: string
  role: string
  confirmed: boolean
  avatar?: string
}

export type { LocalUser }
