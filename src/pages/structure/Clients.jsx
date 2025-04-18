import React from 'react'
import { InfiniteSlider } from '@/components/ui/infinite-slider';
const images = import.meta.glob('/public/clients/*.webp', { eager: true });

export default function Clients() {
  return (
    <div className='py-6 bg-white border border-black flex flex-col items-center justify-center w-screen overflow-x-hidden'>
      <InfiniteSlider gap={56} speedOnHover={1}>
        {Object.keys(images).map((key, index) => {
            const fileName = key.split('/').pop().replace('.webp', '');
            return (
              <div key={key} className="flex flex-col gap-1">
                <img
                  src={images[key]?.default || images[key]}
                  alt={fileName}
                  className="lg:h-[140px] h-[140px] mr-4"
                  onClick={() => openLightbox(index)}
                />
              </div>
            );
          })}
      </InfiniteSlider>
    </div>
  )
}
