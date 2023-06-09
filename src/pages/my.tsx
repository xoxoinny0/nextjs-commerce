import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CountControl } from '@components/CountControl'
import { IconX } from '@tabler/icons-react'
import { Badge, Button } from '@mantine/core'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Orders } from '@prisma/client'
import { useRouter } from 'next/router'
import { OrderItem } from '@prisma/client'
import format from 'date-fns/format'
import { Cart } from '@prisma/client'

interface OrderItemDetail extends OrderItem {
  name: string
  image_url: string
}

interface OrderDetail extends Orders {
  OrderItems: OrderItemDetail[]
}

const ORDER_STATUS_MAP = [
  '주문취소',
  '주문대기',
  '결제대기',
  '결제완료',
  '배송대기',
  '배송중',
  '배송완료',
  '환불대기',
  '환불완료',
  '반품대기',
  '반품완료',
]

export const ORDER_QUERY_KEY = '/api/get-order'

export default function MyPage() {
  const { data } = useQuery<{ items: OrderDetail[] }, unknown, OrderDetail[]>(
    [ORDER_QUERY_KEY],
    () =>
      fetch(ORDER_QUERY_KEY)
        .then((res) => res.json())
        .then((data) => data.items)
  )

  return (
    <div>
      <span className="text-2xl mb-3">주문내역 ({data ? data.length : 0})</span>
      <div className="flex">
        <div className="flex flex-col p-4 space-y-4 flex-1">
          {data ? (
            data.length > 0 ? (
              data.map((item, idx) => <DetailItem key={idx} {...item} />)
            ) : (
              <div>주문내역이 없습니다.</div>
            )
          ) : (
            <div>loading..</div>
          )}
        </div>
      </div>
    </div>
  )
}

const DetailItem = (props: OrderDetail) => {
  const queryClient = useQueryClient()
  const { mutate: updateOrderStatus } = useMutation<
    unknown,
    unknown,
    number,
    any
  >(
    (status) =>
      fetch('/api/update-order-status', {
        method: 'POST',
        body: JSON.stringify({
          id: props.id,
          status: status,
          userId: props.userId,
        }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: async (status) => {
        await queryClient.cancelQueries({ queryKey: [ORDER_QUERY_KEY] })

        const previous = queryClient.getQueryData([ORDER_QUERY_KEY])

        queryClient.setQueryData<Cart[]>([ORDER_QUERY_KEY], (old) =>
          old?.map((c) => {
            if (c.id === props.id) {
              return { ...c, status: status }
            }
            return c
          })
        )

        return { previous }
      },
      onError: (__, _, context) => {
        queryClient.setQueryData([ORDER_QUERY_KEY], context.previous)
      },
      onSuccess: () => {
        queryClient.invalidateQueries([ORDER_QUERY_KEY])
      },
    }
  )
  const handlePayment = () => {
    // 주문상태로 5로 변경
    updateOrderStatus(5)
  }

  const handleCancle = () => {
    // 주문상태로 -1로 변경
    updateOrderStatus(-1)
  }
  return (
    <div
      className="w-full flex flex-col p-4 rounded-md"
      style={{ border: '1px solid grey' }}
    >
      <div className="flex">
        <Badge color={props.status < 1 ? 'red' : ''} className="mb-2 ">
          {ORDER_STATUS_MAP[props.status + 1]}
        </Badge>
        <IconX className="ml-auto" onClick={handleCancle} />
      </div>
      {props.OrderItems?.map((orderItem, idx) => (
        <Item key={idx} {...orderItem} status={props.status} />
      ))}
      <div className="flex mt-4">
        <div className="flex flex-col">
          <span className="mb-2">주문정보</span>
          <span>받는사람: {props.receiver ?? '입력필요'}</span>
          <span>주소: {props.address ?? '입력필요'}</span>
          <span>연락처: {props.phoneNumber ?? '입력필요'}</span>
        </div>
        <div className="flex flex-col ml-auto mr-4 text-right">
          <span className="mb-2 font-semibold">
            합계 금액:{' '}
            <span className="text-red-500">
              {props.OrderItems.map((item) => item.amount)
                .reduce((prev, curr) => prev + curr, 0)
                .toLocaleString('ko-kr')}
              원
            </span>
          </span>
          <span className="text-zinc-400 mt-auto mb-auto">
            주문일자:{' '}
            {format(new Date(props.createdAt), 'yyyy년 M월 d일 HH:mm:ss')}
          </span>
          <Button
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={handlePayment}
          >
            결제 처리
          </Button>
        </div>
      </div>
    </div>
  )
}

const Item = (props: OrderItemDetail & { status: number }) => {
  const router = useRouter()
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity)
  const [amount, setAmount] = useState<number>(props.quantity)
  const handleComment = () => {
    router.push(`/comment/edit?orderItemId=${props.id}`)
  }
  useEffect(() => {
    if (quantity != null) {
      setAmount(quantity * props.price)
    }
  }, [quantity, props.price])

  return (
    <div className="w-full flex p-4" style={{ borderBottom: '1px solid grey' }}>
      <Image
        src={props.image_url}
        width={155}
        height={195}
        alt={props.name}
        onClick={() => router.push(`products/${props.productId}`)}
      />
      <div className="flex flex-col ml-4">
        <span className="font-semibold mb-2">{props.name}</span>
        <span>가격 : {props.price.toLocaleString('ko-kr')}원</span>
        <div className="flex items-center space-x-4">
          <CountControl value={quantity} setValue={setQuantity} />
        </div>
      </div>
      <div className="flex flex-col ml-auto space-x-4">
        <span>{amount.toLocaleString('ko-kr')}원</span>
        {props.status === 5 && (
          <Button
            style={{
              backgroundColor: 'black',
              color: 'white',
              marginTop: 'auto',
            }}
            onClick={handleComment}
          >
            후기 작성
          </Button>
        )}
        <div></div>
      </div>
    </div>
  )
}
