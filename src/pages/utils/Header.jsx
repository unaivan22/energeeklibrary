import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed top-0 z-[999] w-screen bg-white dark:bg-black border'>
      <div className='container'>
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3">
          <nav className="w-full mx-auto flex flex-wrap basis-full items-center justify-between">
            <div className='flex gap-2'>
              <a className=" flex-none text-xl font-semibold dark:text-white focus:outline-hidden focus:opacity-80" href="/">
                <img className='w-[126px] object-cover' src='/elogo.svg' />
              </a>
              <Badge variant="outline" className='rounded-full'>Library</Badge>
            </div>
            {/* <div className="sm:order-3 flex items-center gap-x-2">
              <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                  <button 
                    type="button" 
                    className="sm:hidden relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                    aria-label="Toggle navigation"
                  >
                    {isOpen ? (
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                      </svg>
                    ) : (
                      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/>
                      </svg>
                    )}
                    <span className="sr-only">Toggle</span>
                  </button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="flex flex-col gap-5 p-5">
                    <NavLink
                    exact
                    className="font-medium text-gray-600 hover:text-rose-400 dark:text-neutral-400 dark:hover:text-rose-500" to="/works"
                    activeClassName="active" >
                      Work
                    </NavLink>
                    <NavLink
                    exact
                    className="font-medium text-gray-600 hover:text-rose-400 dark:text-neutral-400 dark:hover:text-rose-500" to="/teams"
                    activeClassName="active" >
                      Team
                    </NavLink>
                    <NavLink
                    exact
                    className="font-medium text-gray-600 hover:text-rose-400 dark:text-neutral-400 dark:hover:text-rose-500" to="/blogs"
                    activeClassName="active" >
                      Blog
                    </NavLink>
                    <a className="font-medium text-gray-600 hover:text-rose-400 dark:text-neutral-400 dark:hover:text-rose-500 flex items-center" href="https://careers.energeek.id" target='_blank'>Career <ArrowUpRight className='w-4 h-4 ml-1' /></a>
                  </div>
                </DrawerContent>
              </Drawer>
              
              <div className='lg:w-[126px] w-fit'>
                <Button className='rounded-2xl'>
                  Contact Us
                </Button>
              </div>
            </div> */}
            
            {/* Navigation di desktop */}
            {/* <div className="hidden sm:block sm:order-2">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:ps-5">
                <NavLink
                  exact
                  className="font-medium text-[1rem] text-gray-600 hover:text-rose-400 dark:text-neutral-400 dark:hover:text-rose-500" to="/works" 
                  activeClassName="active" 
                  >Work
                </NavLink>
                <NavLink
                  exact
                  className="font-medium text-[1rem] text-gray-600 hover:text-rose-400 dark:text-neutral-400 dark:hover:text-rose-500" to="/teams" 
                  activeClassName="active" 
                  >Team
                </NavLink>
                <NavLink
                  exact
                  className="font-medium text-[1rem] text-gray-600 hover:text-rose-400 dark:text-neutral-400 dark:hover:text-rose-500" to="/blogs" 
                  activeClassName="active" 
                  >Blog
                </NavLink>
                <a className="font-medium text-[1rem] text-gray-600 hover:text-rose-400 dark:text-neutral-400 dark:hover:text-rose-500 flex items-center border px-3 py-2 rounded-full" href="https://careers.energeek.id" target='_blank'>Career <ArrowUpRight className='w-4 h-4 ml-1' /> </a>
              </div>
            </div> */}
          </nav>
        </header>
      </div>
    </div>
  )
}
