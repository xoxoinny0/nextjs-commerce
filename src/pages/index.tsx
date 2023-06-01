import { categories, products } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Pagination } from '@mantine/core'
import { CATEGORY_MAP, TAKE } from 'constants/products'
import { SegmentedControl } from '@mantine/core'
import { Select } from '@mantine/core'
import { FILTERS } from 'constants/products'
import { Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import useDebounce from 'hooks/useDebounce'
// 캐시 활용
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  const [activePage, setPage] = useState(1)
  const [selectedCategory, setCategory] = useState<string>('-1')
  const [selectedFilter, setFilter] = useState<string | null>(FILTERS[0].value)
  const [keyword, setKeyword] = useState('')

  const debouncedKeyword = useDebounce<string>(keyword)

  const { data: categories } = useQuery<
    { items: categories[] },
    unknown,
    categories[]
  >(
    ['/api/get-categories'],
    () => fetch('/api/get-categories').then((res) => res.json()),
    { select: (data) => data.items }
  )

  const { data: total } = useQuery(
    [
      `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products-count?category=${selectedCategory}&contains=${debouncedKeyword}`
      ).then((res) => res.json().then((data) => Math.ceil(data.items / TAKE)))
  )

  const { data: products } = useQuery<
    { items: products[] },
    unknown,
    products[]
  >(
    [
      `/api/get-products?skip=${
        TAKE * (activePage - 1)
      }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`,
    ],
    () =>
      fetch(
        `/api/get-products?skip=${
          TAKE * (activePage - 1)
        }&take=${TAKE}&category=${selectedCategory}&orderBy=${selectedFilter}&contains=${debouncedKeyword}`
      ).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <div className="mt-36 mb-36">
      {/* {session && (
        <p>
          안녕하세요.{' '}
          <span className="font-semibold">{session.user?.name}</span>님😄
        </p>
      )} */}
      <div>
        <Input
          className="mt-4"
          icon={<IconSearch />}
          placeholder="Search"
          value={keyword}
          onChange={handleChange}
        />
      </div>

      {categories && (
        <div className="mb-4 mt-4">
          <SegmentedControl
            value={selectedCategory}
            onChange={setCategory}
            data={[
              { label: 'ALL', value: '-1' },
              ...categories.map((category) => ({
                label: category.name,
                value: String(category.id),
              })),
            ]}
            color="dark"
          />
        </div>
      )}

      <div className="mb-4">
        <Select value={selectedFilter} onChange={setFilter} data={FILTERS} />
      </div>

      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => (
            <div
              key={item.id}
              style={{ maxWidth: 310, cursor: 'pointer' }}
              onClick={() => router.push(`/products/${item.id}`)}
            >
              <Image
                className="rounded"
                src={item.image_url ?? ''}
                width={310}
                height={300}
                alt={item.name}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NTevBwACcAEkIA3XaAAAAABJRU5ErkJggg=="
              />
              <div className="flex">
                <span>{item.name}</span>
                <span className="ml-auto">
                  {item.price.toLocaleString('ko-KR')}원
                </span>
              </div>
              <span className="text-zinc-400">
                {CATEGORY_MAP[item.category_id - 1]}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex mt-5">
        {total && (
          <Pagination
            className="m-auto"
            value={activePage}
            onChange={setPage}
            total={total}
          />
        )}
      </div>
    </div>
  )
}
