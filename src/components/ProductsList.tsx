'use client'

import { useIntersection } from '@mantine/hooks'
import { Product } from '@prisma/client'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import ProductCard from '@/components/cards/ProductCard'
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton'
import { INFINITE_SCROLL_LIMIT } from '@/config'

interface ProductsListProps {
  initialProducts: Product[]
  totalData: number
}

const ProductsList: React.FC<ProductsListProps> = ({
  initialProducts,
  totalData,
}) => {
  const ref = useRef(null)
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {initialProducts.map((product, index) => {
        if (index === initialProducts.length - 1 && initialProducts.length < totalData) {
          return (
            <div key={product.id} ref={ref}>
              <ProductCard product={product} />
            </div>
          )
        } else {
          return <ProductCard key={product.id} product={product} />
        }
      })}
      {/* {isFetchingNextPage &&
        Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))} */}
    </div>
  )
}

export default ProductsList
