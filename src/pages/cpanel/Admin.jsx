import React, { useEffect, useState } from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import AdminProjects from './AdminProjects'
import { Button } from '@/components/ui/button'
import AdminTeams from './AdminTeams'
import AdminBlogs from './AdminBlogs'
import { ArrowUpRight, MoreHorizontal } from 'lucide-react'
import Forbidden from '../misc/Forbidden'
import { ModeToggle } from '@/components/mode-toggle';
import ClearCookies from '../misc/ClearCookies';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Admin() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Change the breakpoint as per your needs
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <div>
      {isMobile ? <Forbidden /> : 
      <div className='container'>
        <div className='flex items-center justify-between items-center'>
            <h1 className='font-semibold text-4xl py-6'>Admin Panel</h1>
            <div className='flex gap-3'>
              <ModeToggle />
              <ClearCookies />
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className='aspect-square rounded-2xl'>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Option</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                    <a href='/' target='_blank' className='w-full'>
                      <div className='flex items-center justify-between w-full' >Go to Home <ArrowUpRight className='w-4 ml-2' /></div>
                    </a>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <ClearCookies />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
        </div>
        <AdminBlogs />
        {/* <Tabs defaultValue="project" className="w-full">
            <TabsList className="grid w-full grid-cols-4 w-[400px]">
                <TabsTrigger value="project">Projects</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="setting">Setting</TabsTrigger>
            </TabsList>
            <TabsContent value="project">
                <AdminProjects />
            </TabsContent>
            <TabsContent value="blog">
                <AdminBlogs />
            </TabsContent>
            <TabsContent value="team">
                <AdminTeams />
            </TabsContent>
            <TabsContent value="setting">
                <p className='py-6 opacity-60 font-light italic'>Underdevelopment - bisa ditambahi fitur lainnya kedepannya</p>
            </TabsContent>
        </Tabs> */}
      </div>
      }
    </div>
  )
}
