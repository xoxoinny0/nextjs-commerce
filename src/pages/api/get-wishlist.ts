import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

const prisma = new PrismaClient()

async function getWishList(userId: string) {
  try {
    const response = await prisma.wishList.findUnique({
      where: {
        userId: userId,
      },
    })
    console.log(response)
    return response?.productIds.split(',')
  } catch (error) {
    console.error(error)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions)
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    if (session.user) {
      console.log(session, '우아아아아아앙')

      const wishlist = await getWishList(String(session.id))
      res.status(200).json({ items: wishlist, message: 'Success' })
    }
  } catch {
    res.status(400).json({ message: 'Failed' })
  }
}
