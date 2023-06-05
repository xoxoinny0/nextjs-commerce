import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
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
      // console.log("세션 :", session)
      // console.log("유저 :", user)

      ;(session as any).id = user.id
      console.log('세션(제발~~~~)', session)

      return Promise.resolve(session)

      // if (session.user) {
      //   session.user.id = user.id
      // }
      // return Promise.resolve(session)

      // return session
    },
  },
  secret: process.env.CLIENT_SECRET,
}
export default NextAuth(authOptions)
