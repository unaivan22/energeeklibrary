import { Atom } from 'lucide-react'
import React from 'react'

export default function WhyChooseUs() {
  return (
    <div className='bg-black'>
      <div className='container py-32 text-white'>
        <div className='flex flex-col gap-2 items-center'>
          <h2 className='text-4xl lg:max-w-[500px] font-semibold'>Why Choose Us</h2>
          <p className='opacity-50 text-md lg:max-w-[500px]'>Energeek Help Your Company Go Gigital</p>
        </div>
        <div className='grid lg:grid-cols-2 grid-cols-1 py-12 gap-4 py-24'>
          <div className='flex flex-col items-center text-center gap-4 border border-white rounded-xl p-12 hover:bg-[#89AC46] transition delay-50 duration-300 ease-in-out'>
            <div className='bg-rose-500 w-fit p-6 rounded-full'>
              <Atom className='w-12 h-12' />
            </div>
            <h3 className='text-2xl'>Expertise & Experience</h3>
            <p className='text-sm font-light opacity-90'>Energeek helps your company go digital. With cutting-edge technology services, we ensure your business stays competitive and innovative.</p>
          </div>
          <div className='flex flex-col items-center text-center gap-4 border border-white rounded-xl p-12 hover:bg-[#89AC46] transition delay-50 duration-300 ease-in-out'>
            <div className='bg-rose-500 w-fit p-6 rounded-full'>
              <Atom className='w-12 h-12' />
            </div>
            <h3 className='text-2xl'>Expertise & Experience</h3>
            <p className='text-sm font-light opacity-90'>Energeek helps your company go digital. With cutting-edge technology services, we ensure your business stays competitive and innovative.</p>
          </div> 
        </div>
      </div>
    </div>
  )
}
