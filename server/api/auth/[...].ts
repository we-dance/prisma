import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { FirebaseScrypt } from 'firebase-scrypt'
import { NuxtAuthHandler } from '#auth'

const prisma = new PrismaClient()

const firebaseParameters = {
  memCost: 14,
  rounds: 8,
  saltSeparator: String(process.env.FIREBASE_SALT_SEPARATOR),
  signerKey: String(process.env.FIREBASE_SIGNER_KEY)
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 3000
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login'
  },
  callbacks: {
    session: async ({ session }) => {
      const email = session.user.email

      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      session.user.id = user.id
      return Promise.resolve(session)
    }
  },
  providers: [
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials: any) {
        if (!credentials.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        const scrypt = new FirebaseScrypt(firebaseParameters)

        const isValid = await scrypt.verify(credentials.password, user.salt, user.hash)

        if (!isValid) {
          return null
        }

        return user
      }
    }),
    CredentialsProvider.default({
      id: 'register',
      name: 'register',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials: any) {
        if (!credentials.email || !credentials.password || !credentials.name) {
          return null
        }

        const scrypt = new FirebaseScrypt(firebaseParameters)
        const salt = Buffer.from(String(Math.random()).slice(7)).toString('base64')

        const hash = await scrypt.hash(credentials.password, salt)

        let user = null

        try {
          user = await prisma.user.create({
            data: {
              name: credentials.name,
              email: credentials.email,
              hash,
              salt
            }
          })
        } catch (error) {
          console.log(error)
          return null
        }

        if (!user) {
          return null
        }

        return user
      }
    })
  ]
})
