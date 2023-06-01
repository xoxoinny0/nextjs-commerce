import CustomEditor from '@components/Editor'
import { products } from '@prisma/client'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Carousel from 'nuka-carousel'
import { useEffect, useState } from 'react'
import format from 'date-fns/format'
import { CATEGORY_MAP } from 'constants/products'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Button } from '@mantine/core'
import { IconHeart, IconHeartbeat, IconShoppingCart } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { CountControl } from '@components/CountControl'
import { Cart } from '@prisma/client'
import { CART_QUERY_KEY } from 'src/pages/cart'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await fetch(
    `http://localhost:3000/api/get-product?id=${context.params?.id}`
  )
    .then((res) => res.json())
    .then((data) => data.items)
  return {
    props: {
      product: { ...product, images: [product?.image_url, product?.image_url] },
    },
  }
}

const WISHLIST_QUERY_KEY = '/api/get-wishlist'

export default function Products(props: {
  product: products & { images: string[] }
}) {
  const [index, setIndex] = useState(0)
  const { data: session } = useSession()
  const [quantity, setQuantity] = useState<number | undefined>(1)

  const router = useRouter()
  const queryClient = useQueryClient()
  const { id: productId } = router.query

  const [editorState] = useState<EditorState | undefined>(() =>
    props.product.contents
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(props.product.contents))
        )
      : EditorState.createEmpty()
  )

  const { data: wishlist } = useQuery([WISHLIST_QUERY_KEY], () =>
    fetch(WISHLIST_QUERY_KEY)
      .then((res) => res.json())
      .then((data) => data.items)
  )

  const { mutate } = useMutation<unknown, unknown, string, any>(
    (productId) =>
      fetch('/api/update-wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: async (productId) => {
        await queryClient.cancelQueries({ queryKey: [WISHLIST_QUERY_KEY] })

        const previous = queryClient.getQueryData([WISHLIST_QUERY_KEY])

        queryClient.setQueryData<string[]>([WISHLIST_QUERY_KEY], (old) =>
          old
            ? old.includes(String(productId))
              ? old.filter((id) => id !== String(productId))
              : old.concat(String(productId))
            : []
        )

        return { previous }
      },
      onError: (error, _, context) => {
        queryClient.setQueryData([WISHLIST_QUERY_KEY], context.previous)
      },
      onSuccess: () => {
        queryClient.invalidateQueries([WISHLIST_QUERY_KEY])
      },
    }
  )

  const { mutate: addCart } = useMutation<
    unknown,
    unknown,
    Omit<Cart, 'id' | 'userId'>,
    any
  >(
    (item) =>
      fetch('/api/add-cart', {
        method: 'POST',
        body: JSON.stringify({ item }),
      })
        .then((data) => data.json())
        .then((res) => res.items),
    {
      onMutate: () => {
        queryClient.invalidateQueries([CART_QUERY_KEY])
      },
      onSuccess: () => {
        router.push('/cart')
      },
    }
  )

  const product = props.product

  const validate = (type: 'cart' | 'order') => {
    if (quantity == null) {
      alert('최소수량을 선택하세요.')
      return
    }

    if (type === 'cart') {
      addCart({
        productId: product.id,
        quantity: quantity,
        amount: product.price * quantity,
      })
    }
  }

  const isWished =
    wishlist != null && productId != null ? wishlist.includes(productId) : false

  return (
    <>
      {product != null && productId != null ? (
        <div className="flex flex-row">
          <div
            style={{
              maxWidth: 600,
              marginRight: 52,
            }}
          >
            <Carousel
              animation="fade"
              // autoplay
              withoutControls
              wrapAround
              speed={10}
              slideIndex={index}
            >
              {product.images.map((url, idx) => (
                <Image
                  key={`${url}-carousel-${idx}`}
                  src={url}
                  alt="image"
                  width={620}
                  height={800}
                  layout="responsive"
                />
              ))}
            </Carousel>

            <div className="flex space-x-4 mt-2">
              {product.images.map((url, idx) => (
                <div key={`${url}-thumb-${idx}`} onClick={() => setIndex(idx)}>
                  <Image src={url} alt="image" width={155} height={195} />
                </div>
              ))}
            </div>
            {editorState != null && (
              <CustomEditor editorState={editorState} readOnly />
            )}
          </div>
          <div style={{ maxWidth: 600 }} className="flex flex-col space-x-6">
            <div className="text-lg text-zinc-400">
              {CATEGORY_MAP[product.category_id - 1]}
            </div>
            <div className="text-4xl font-semibold">{product.name}</div>
            <div className="text-lg">
              {product.price.toLocaleString('ko-kr')}원
            </div>
            <div>
              <span className="text-lg">수량</span>
              <CountControl value={quantity} setValue={setQuantity} min={1} />
            </div>
            {/* 장바구니버튼 */}
            <div className="flex space-x-3">
              <Button
                leftIcon={<IconShoppingCart size={20} stroke={1.5} />}
                style={{ backgroundColor: 'black' }}
                radius="xl"
                size="md"
                styles={{
                  root: { paddingRight: 14, height: 48 },
                }}
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요합니다.')
                    router.push('/auth/login')
                    return
                  }
                  validate('cart')
                }}
              >
                장바구니
              </Button>

              {/* 찜하기버튼 */}
              <Button
                // loading ={isLoading}
                disabled={wishlist == null}
                leftIcon={
                  isWished ? (
                    <IconHeart size={20} stroke={1.5} />
                  ) : (
                    <IconHeartbeat size={20} stroke={1.5} />
                  )
                }
                style={{ backgroundColor: isWished ? 'red' : 'gray' }}
                radius="xl"
                size="md"
                styles={{
                  root: { paddingRight: 14, height: 48 },
                }}
                onClick={() => {
                  if (session == null) {
                    alert('로그인이 필요합니다.')
                    router.push('/auth/login')
                    return
                  }
                  mutate(String(productId))
                }}
              >
                찜하기
              </Button>
            </div>
            <div className="text-sm text-zinc-300">
              등록 : {format(new Date(product.price), 'yyyy년 M월 d일')}
            </div>
          </div>
        </div>
      ) : (
        <div>로딩 중..</div>
      )}
    </>
  )
}
