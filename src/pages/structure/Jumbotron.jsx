import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Jumbotron() {
  return (
    <div id='gridz' className='container min-h-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='lg:text-[5rem] text-[2.5rem] lg:leading-[6rem] leading-[3rem] text-center font-semibold lg:px-32 px-6 w-full mt-12'>Dare to Take Steps Towards a Better Digital Era</h1>
        <p className='text-center lg:px-32 px-6 opacity-50'>Energeek is your trusted partner in providing Digital solutions that meet your business needs</p>
        <div className='flex lg:flex-row flex-col gap-4 py-4'>
          <Link to="/#ourservices">
            <Button className='rounded-full text-xl border-2 border-black' size='xxlg'>Get Started <ArrowRight className='w-4 h-4 ml-2' /> </Button>
          </Link>
          <Button className='rounded-full text-xl border-2 border-black' size='xxlg' variant='outline'>Contact Us <ArrowRight className='w-4 h-4 ml-2' /> </Button>
        </div>
      </div>
    </div>
  )
}
