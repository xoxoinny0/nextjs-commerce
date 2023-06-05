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

  // callbacks: {
  //   session({ session, token, user }) {
  //     return session // The return type will match the one returned in `useSession()`
  //   },
  // },

  // 여기부터
  // callbacks: {
  //   async session({ session, token }: { session: Session; token: JWT }) {
  //     console.log(token)
  //     // session.user.id = session.user

  //     // session.user.id = token.sub;

  //     if (session.user) {
  //       // session.user.id = token.idToken
  //     console.log(session,"제발요")

  //     }

  //     return Promise.resolve(session)
  //     // return session;
  //   },
  // },
}
export default NextAuth(authOptions)
