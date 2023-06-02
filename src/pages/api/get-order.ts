import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderItem, PrismaClient } from '@prisma/client'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

const prisma = new PrismaClient()

async function getOrder(userId: string) {
  try {
    // orders 테이블에서 나의 주문들 조회
    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    })

    console.log(orders)

    let response = []

    // orders 안에 있는 orderItemIds로 orderItem을 꺼내고 products 테이블에서 이미지 등 정보를 조합
    for (const order of orders) {
      let OrderItems: OrderItem[] = []
      for (const id of order.orderItemIds
        .split(',')
        .map((item) => Number(item))) {
        const res: OrderItem[] = await prisma.$queryRaw`
        select i.id, quantity, amount, i.price, name, image_url, productId from OrderItem as i join products as p on i.productId=p.id where i.id=${id}`
        OrderItems.push.apply(OrderItems, res)
      }
      response.push({ ...order, OrderItems })
    }

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
  if (session == null) {
    res.status(200).json({ items: [], message: 'no Session' })
    return
  }

  try {
    if (session.user) {
      const wishlist = await getOrder(String(session.id))
      res.status(200).json({ items: wishlist, message: 'Success' })
    }
  } catch {
    res.status(400).json({ message: 'Failed' })
  }
}
