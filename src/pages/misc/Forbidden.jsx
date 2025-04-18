import React from 'react'
import Lottie from "react-lottie-player";
import wrongData from '../lottie/wrong.json';

export default function Forbidden() {
  return (
    <div className='grid h-screen place-items-center'>
        <div className='w-full flex flex-col gap-8 items-center justify-center'>
          {/* <img className='w-60 grayscale' src='/forbidden.svg' /> */}
          <Lottie
            play
            loop
            animationData={wrongData}
            className='w-72 h-72'
            />
          <p className='-translate-y-16'>Hanya bisa diakses di mode web</p>
        </div>
    </div>
  )
}