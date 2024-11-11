'use client'
import Info from '@/components/Info'
import Gallery from '@/components/gallery/Gallery'
import CategoryCardSkeleton from '@/components/skeletons/CategoryCardSkeleton'
import { Button } from '@/components/ui/Button'
import useCart from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import { fetchSelectedProducts } from '@/store/action'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProductDetails = ({ searchParams }: { searchParams: { productId: string } }) => {
  const cart = useCart()

  const onAddToCart: MouseEventHandler<any> = (e) => {
    e.preventDefault()
    cart.addItem(selectedProduct)
  }

  const [loading, setLoading] = useState(true)
  const { productId } = searchParams
  const selectedProduct = useSelector((state: any) => state?.ecomm?.selectedItem || {})
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true)
      await dispatch(fetchSelectedProducts(productId))
      setLoading(false)
    }

    fetchProductData()
  }, [dispatch, productId])

  if (loading) {
    return <CategoryCardSkeleton />
  }

  return (
    <div className='p-4 sm:p-6 lg:px-8'>
      <div className='grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-start lg:gap-x-8'>
        <Gallery image={selectedProduct} />
        <div className='flex-1 flex flex-col justify-start p-6 space-y-4 w-full'>
          <h2 className='text-2xl font-semibold'>{selectedProduct?.title}</h2>
          <p className='text w-full text-gray-500'>{selectedProduct?.description}</p>
          <span className='text-xl font-bold text-gray-900'>{formatPrice(parseFloat(selectedProduct?.price))}</span>
          <Button onClick={onAddToCart} className='text-white group-hover/icon:text-[#ffff]'>
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
