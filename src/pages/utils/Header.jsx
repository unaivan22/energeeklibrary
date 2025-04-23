import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ClearCookies from '../misc/ClearCookies';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed top-0 z-[999] w-screen bg-white dark:bg-black border'>
      <div className='container'>
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3">
          <nav className="w-full mx-auto flex items-center justify-between">
            <div className='flex gap-2 items-center w-full'>
              <a className=" flex-none text-xl font-semibold dark:text-white focus:outline-hidden focus:opacity-80" href="/">
                <img className='w-[126px] object-cover' src='/elogo.svg' />
              </a>
              <Badge variant="outline" className='rounded-full'>Library</Badge>
            </div>
            <div>
              <ClearCookies />
            </div>
          </nav>
        </header>
      </div>
    </div>
  )
}
