import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

const prisma = new PrismaClient()

async function getCart(userId: string) {
  try {
    const cart =
      await prisma.$queryRaw`select c.id, userId, quantity, amount, price, name, image_url, productId from Cart as c join products as p where c.productId=p.id AND c.userId=${userId}`

    console.log(cart)
    return cart
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
      const wishlist = await getCart(String((session as any).id))
      res.status(200).json({ items: wishlist, message: 'Success' })
    }
  } catch {
    res.status(400).json({ message: 'Failed' })
  }
}
