import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

const prisma = new PrismaClient()

async function updateComment({
  userId,
  orderItemId,
  rate,
  contents,
  images,
}: {
  userId: string
  orderItemId: number
  rate: number
  contents: string
  images: string
}) {
  try {
    const response = await prisma.comment.upsert({
      where: {
        orderItemId,
      },
      update: {
        contents,
        rate,
        images,
      },
      create: {
        userId,
        orderItemId,
        contents,
        rate,
        images,
      },
    })

    console.log(response)

    return response
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
  const { orderItemId, rate, contents, images } = JSON.parse(req.body)
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    const wishlist = await updateComment({
      userId: String((session as any).id),

      // userId: String(session.id),
      orderItemId: orderItemId,
      rate: rate,
      contents: contents,
      images: images,
    })
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch {
    res.status(400).json({ message: 'Failed' })
  }
}
