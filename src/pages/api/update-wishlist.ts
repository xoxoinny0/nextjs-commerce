import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

const prisma = new PrismaClient()

async function updateWishList(userId: string, productId: string) {
  try {
    const wishlist = await prisma.wishList.findUnique({
      where: {
        userId: userId,
      },
    })

    const originWishList =
      wishlist?.productIds != null && wishlist.productIds !== ''
        ? wishlist.productIds.split(',')
        : []

    const isWished = originWishList.includes(productId)

    const newWishList = isWished
      ? originWishList.filter((id) => id !== productId)
      : [...originWishList, productId]

    const response = await prisma.wishList.upsert({
      where: {
        userId,
      },
      update: {
        productIds: newWishList.join(','),
      },
      create: {
        userId,
        productIds: newWishList.join(','),
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
  const { productId } = JSON.parse(req.body)
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    const wishlist = await updateWishList(
      String((session as any).id),
      String(productId)
    )
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch {
    res.status(400).json({ message: 'Failed' })
  }
}
