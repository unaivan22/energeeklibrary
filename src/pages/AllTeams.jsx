import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowUpRight, Asterisk } from 'lucide-react'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './utils/Header'
import { SpinningText } from '@/components/motion-primitives/spinning-text'
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ModeToggle } from '@/components/mode-toggle';
import AnimatedPage from './utils/AnimatedPage';
import ScrollToTop from './utils/ScrollToTop';
import Footer from './utils/Footer';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

export default function AllTeams() {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
      fetchTeams();
    }, []);
  
    const fetchTeams = async () => {
      try {
        const res = await axios.get("/api/getTeams.php");
        setTeams(res.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
  return (
    <div>
        <AnimatedPage>
        <Header />
        <ScrollToTop />
        <div id='gridz' className='container min-h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className='lg:text-[5rem] text-[2.5rem] lg:leading-[6rem] leading-[3rem] text-center font-semibold lg:px-32 px-6 w-full mt-12'>Our Teams</h1>
                <p className='text-center lg:px-32 px-6 opacity-50'>Meet Our Professional Staff, Want to join us?</p>
                <div className='flex lg:flex-row flex-col gap-4 py-4'>
                <a href='https://careers.energeek.id/' target='_blank'><Button className='rounded-full text-xl border-2 border-black' size='xxlg'>Join Us <ArrowUpRight className='w-8 h-8 ml-2' /> </Button></a>
                {/* <Button className='rounded-full text-xl border-2 border-black' size='xxlg' variant='outline'>Contact Us <ArrowRight className='w-4 h-4 ml-2' /> </Button> */}
                </div>
            </div>
            <div className='absolute lg:top-[30vh] top-[26vh] left-[20vw]'>
                <SpinningText
                    radius={5}
                    fontSize={1.2}
                    className='font-medium leading-none'
                    >
                    {`Energeek • IT Consultant • Service • `}
                </SpinningText>
            </div>
            <div className='absolute lg:bottom-[30vh] bottom-[10vh] right-[20vw]'>
                <SpinningText
                    radius={5}
                    fontSize={1.3}
                    duration={6}
                    transition={{
                        ease: 'easeInOut',
                        repeat: Infinity,
                    }}
                    className='font-medium leading-none'
                    >
                    {`All Teams • Join With Us • Now • `}
                </SpinningText>
            </div>
        </div>
        <div className='' id='allteams'>
            <div className='container py-32'>
            <div className='flex flex-col gap-2 items-left'>
                <h2 className='text-4xl lg:max-w-[500px] font-semibold'>Teams</h2>
                <p className='opacity-50 text-md lg:max-w-[500px]'>Meet Our Professional Staff</p>
            </div>
            <div className='grid lg:grid-cols-3 grid-cols-1 py-24 pb-12 gap-6'>
            {teams.map((team) => (
                <Drawer key={team.id}>
                    <DrawerTrigger asChild>
                        <div className='border border-black dark:border-white flex flex-col items-center rounded-xl p-6 gap-2 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] cursor-pointer'>
                        {team.photo && <img src={team.photo} alt="Team" className='rounded-full object-cover h-[280px] w-auto' />}
                        <h1 className='text-xl font-semibold line-clamp-2'>{team.name}</h1>
                        <p className='italic text-sm opacity-70 font-light'>{team.role}</p>
                        <p className='italic text-sm opacity-70 font-light'> {team.email}</p>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm pb-12 flex flex-col">
                        {team.photo && <img src={team.photo} alt="Team" className='object-cover h-[360px] aspect-square w-auto mb-6 border-2 border-black' />}
                        <h1 className='text-2xl font-bold line-clamp-2'>{team.name}</h1>
                        <p className='italic text-lg opacity-70 font-semibold'>{team.role}</p>
                        <a className='italic text-lg opacity-70 font-semibold underline' href={`mailto:${team.email}`}>
                            {team.email}
                        </a>
                        </div>
                    </DrawerContent>
                    </Drawer>
            ))}
            </div>
            </div>
        </div>
        <div className='py-8 bg-[#DC2728] w-screen overflow-x-hidden'>
            <InfiniteSlider speedOnHover={10} gap={32}>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
                <h5 className='text-3xl font-semibold text-white flex items-center gap-2'> <Asterisk className='w-6 h-6' /> Let's Grow With Us</h5>
            </InfiniteSlider>
        </div>
        <div className='fixed lg:bottom-12 bottom-8 lg:right-12 right-8'>
            <ModeToggle />
        </div>
        </AnimatedPage>
        <Footer />
    </div>
  )
}
