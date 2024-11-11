"use client"
import ProductCard from '@/components/cards/ProductCard'
import { fetchProducts } from '@/store/action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const PopularProducts = async () => {
  const products: any[] = useSelector((state: any) => state.ecomm?.allProducts || []);

  const dispatch = useDispatch()

  console.log("dvjsvb", products)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default PopularProducts
