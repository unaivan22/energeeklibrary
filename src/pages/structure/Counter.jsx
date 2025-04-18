'use client';
import { useEffect, useState, useRef } from 'react';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { useInView } from 'motion/react';

export default function Counter() {
  const [project, setProject] = useState(0);
  const [client, setClient] = useState(0);
  const [team, setTeam] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref);

  if (isInView && project === 0) {
    setValue(10000);
  }
  
  useEffect(() => {
    setProject(200);
    setClient(50);
    setTeam(20);
  }, []);
  
  return (
    <div className='py-10 bg-black flex flex-col items-center justify-center'>
      <div className='grid grid-cols-3 w-full container'>
        <div className='flex flex-col items-center gap-2'>
          <div className='flex items-center gap-2' >
            <AnimatedNumber
              className='inline-flex items-start text-4xl lg:text-[3rem] font-semibold text-white'
              springOptions={{
                bounce: 0,
                duration: 2000,
              }}
              value={project}
            />
            <p className='text-white text-4xl lg:text-[3rem]'>+</p>
          </div>
          <p className='text-white text-sm lg:text-lg'>Project Done</p>
        </div>
        <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-2'>
            <AnimatedNumber
              className='inline-flex items-start text-4xl lg:text-[3rem] font-semibold text-white'
              springOptions={{
                bounce: 0,
                duration: 2000,
              }}
              value={client}
            />
            <p className='text-white text-4xl lg:text-[3rem]'>+</p>
          </div>
          <p className='text-white text-sm lg:text-lg'>Clients</p>
        </div>
        <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-2'>
            <AnimatedNumber
              className='inline-flex items-start text-4xl lg:text-[3rem] font-semibold text-white'
              springOptions={{
                bounce: 0,
                duration: 2000,
              }}
              value={team}
            />
            <p className='text-white text-4xl lg:text-[3rem]'>+</p>
          </div>
          <p className='text-white text-sm lg:text-lg'>Professional Team</p>
        </div>
      </div>
    </div>
  )
}
