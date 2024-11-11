'use client'
import Filter from '@/components/Filter'
import { Heading } from '@/components/Heading'
import ProductsList from '@/components/ProductsList'
import { INFINITE_SCROLL_LIMIT, categories } from '@/config'
import { fetchCategoryViceProducts, fetchProducts } from '@/store/action'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductsLoading from './loading'

const Products = ({ searchParams }: { searchParams: { category: string } }) => {
  const dispatch = useDispatch()
  const { category } = searchParams
  const [loading, setLoading] = useState(false)
  const allProducts = useSelector((state: any) => state?.ecomm?.categoryVice || [])
  const defaultAllProducts = useSelector((state: any) => state?.ecomm?.allProducts || [])

  const handleCategory = async () => {
    await dispatch(fetchCategoryViceProducts(category))
  }

  const handleDefault = async () => {
    await dispatch(fetchProducts())
  }

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true)
      if (category?.trim()?.length > 0) {
        await handleCategory()
      } else {
        await handleDefault()
      }
      setLoading(false)
    }

    fetchProductsData()
  }, [dispatch, category])

  if (loading) {
    return <ProductsLoading />

  }

  return (
    <div className='flex flex-col py-6 sm:py-10 px-4 sm:px-6 lg:px-8'>
      <Heading
        title='Products'
        description='Explore all products from around the world'
      />
      <Filter categories={categories} className='mt-8 sm:mt-10 mb-4 sm:mb-6' />

      <ProductsList
        initialProducts={category?.trim()?.length > 0 ? allProducts : defaultAllProducts}
        totalData={15}
      />

    </div>
  )
}

export default Products
