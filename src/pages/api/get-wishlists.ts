import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

const prisma = new PrismaClient()

async function getWishLists(userId: string) {
  try {
    const wishlist = await prisma.wishList.findUnique({
      where: {
        userId: userId,
      },
    })

    const productsId = wishlist?.productIds
      .split(',')
      .map((item) => Number(item))

    if (productsId && productsId.length > 0) {
      const response = await prisma.products.findMany({
        where: {
          id: {
            in: productsId,
          },
        },
      })
      console.log(response)
      return response
    }
    return []
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
      const wishlist = await getWishLists(String((session as any).id))
      res.status(200).json({ items: wishlist, message: 'Success' })
    }
  } catch {
    res.status(400).json({ message: 'Failed' })
  }
}
