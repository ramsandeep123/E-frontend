'use client'


import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

import IconButton from '@/components/ui/IconButton'
import { formatPrice } from '@/lib/utils'
import useCart from '@/hooks/useCart'

interface ProductCardProps {
  product: any & {
    Category: any
  }
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cart = useCart()

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    cart.addItem(product)
  }

  return (
    <div className='group/card shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4 h-full'>
      <Link
        href={`/${4}/${product.title}?productId=${product._id}`}
      >
        {/* Images and Actions */}
        <div className='aspect-square m-3 rounded-2xl bg-gray-100 relative'>
          <Image
            // @ts-ignore
            src={product.image}
            fill
            sizes='200'
            // @ts-ignore
            alt={product?.title}
            className='aspect-square object-cover rounded-2xl'
          />
        </div>
        <div className='px-4 space-y-3 pb-6'>
          <div className='space-y-1'>
            {/* Product Name */}
            <p className='text-sm text-gray-500'>{product?.category}</p>
            <p
              className='font-semibold group-hover/card:text-[#106ab9] text-lg truncate'
              title={product?.title}
            >
              {product?.title}
            </p>
            <Image alt='Stars' src='/svg/stars.svg' width={100} height={100} />
          </div>
          <div className='flex items-center justify-between'>

            <div className='font-semibold text-[#106ab9]'>

              {formatPrice(parseFloat(product.price))}
            </div>
            <div className='flex justify-center group/icon'>
              <IconButton
                aria-label='add-to-cart'
                className='bg-white group-hover/icon:bg-[#106ab9]'
                onClick={onAddToCart}
                icon={
                  <ShoppingCart
                    size={20}
                    className='text-[#106ab9] group-hover/icon:text-[#ffff]'
                  />
                }
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
