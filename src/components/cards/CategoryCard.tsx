
import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'


interface CategoryCardProps {
  category: any
}

const CategoryCard: React.FC<CategoryCardProps> = async ({ category }) => {
  const products: any[] = []
  return (
    <Link href={`/products?category=${category.slug}`}>
      <Card className='relative h-full w-full overflow-hidden rounded-lg bg-transparent transition-colors group hover:bg-[#106ab9]'>
        <CardHeader>
          <Image
            src={`/svg/${category.slug}.svg`}
            alt='test'
            width={32}
            height={32}
          />
        </CardHeader>
        <CardContent className='space-y-1.5'>
          <CardTitle className='capitalize text-[#106ab9] group-hover:text-white'>
            {category.name}
          </CardTitle>
          <CardDescription className='group-hover:text-white'>
            {products} Products
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CategoryCard
