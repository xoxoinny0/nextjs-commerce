import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { OrderItem } from '@prisma/client'

const prisma = new PrismaClient()

async function addOrder(
  userId: string,
  items: Omit<OrderItem, 'id'>[],
  orderInfo?: {
    receiver: string
    address: string
    phoneNumber: string
  }
) {
  try {
    // orderItem 생성
    let orderItemIds = []
    for (const item of items) {
      const OrderItem = await prisma.orderItem.create({
        data: {
          ...item,
        },
      })
      console.log(`Created id: ${OrderItem.id}`)
      orderItemIds.push(OrderItem.id)
    }

    console.log(JSON.stringify(orderItemIds))

    // 만들어진 orderItemIds를 포함한 order 생성
    const response = await prisma.orders.create({
      data: {
        userId,
        orderItemIds: orderItemIds.join(','),
        ...orderInfo,
        status: 0,
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
  const { items, orderInfo } = JSON.parse(req.body)
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    const wishlist = await addOrder(
      String((session as any).id),
      items,
      orderInfo
    )
    res.status(200).json({ items: wishlist, message: 'Success' })
  } catch {
    res.status(400).json({ message: 'Failed' })
  }
}
