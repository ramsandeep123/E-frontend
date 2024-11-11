'use client'

import Image from 'next/image'
import { Tab } from '@headlessui/react'

import { Image as ImageType } from '@/types/images'

import GalleryTab from './GalleryTab'

interface GalleryProps {
  image: any
}

const Gallery: React.FC<GalleryProps> = ({ image }) => {
  return (
    <Tab.Group as='div' className='flex flex-col-reverse'>
      <div className='mt-6 w-full'>
        <Tab.List className='grid grid-cols-4 gap-6'>

          <GalleryTab key={image?._id} image={image} />

        </Tab.List>
      </div>
      <Tab.Panels className='aspect-square w-full'>

        <Tab.Panel key={""}>
          <div className='aspect-square relative h-[500px] w-[600px] rounded-lg overflow-hidden'>
            <Image
              priority
              fill
              src={image?.image}
              alt='Image'
              className='object-cover object-center'
            />

          </div>

        </Tab.Panel>

      </Tab.Panels>

    </Tab.Group>
  )
}

export default Gallery
