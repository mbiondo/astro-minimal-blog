import { SendEmail } from '@lib/email/send'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { db, eq, User } from 'astro:db'

export const Signup = async ({
  email,
  password,
  name,
  avatar,
}: {
  email: string
  password: string
  name: string
  avatar: string
}): Promise<string> => {
  const userId = generateId(15)
  const hashedPassword = await new Argon2id().hash(password)

  const existingUser = await db.select().from(User).where(eq(User.email, email.toLowerCase())).get()

  if (!existingUser) {
    await db.insert(User).values({
      id: userId,
      email: email.toLowerCase(),
      confirmed: false,
      name: name,
      role: 'user',
      avatar: avatar,
      hashed_password: hashedPassword,
    })

    SendEmail({
      to: [email],
      subject: 'Confirm your email',
      from: 'noreply@domain.com',
      html: `Click here to confirm your email: ${process.env.BASE_URL}/auth/confirm/${userId}`,
    })

    return userId
  } else {
    return ''
  }
}
