import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID ?? '',
      clientSecret: process.env.CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'database',
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    session: async ({ session, user }) => {
      console.log('유저', user)
      console.log('세션', session)

      session.id = user.id
      return Promise.resolve(session)
    },
  },
}
export default NextAuth(authOptions)
