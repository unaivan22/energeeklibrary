import React, { useEffect, useState } from 'react';
import Jumbotron from './structure/Jumbotron'
import Services from './structure/Services'
import WhyChooseUs from './structure/WhyChooseUs'
import Portfolios from './structure/Portfolios'
import Teams from './structure/Teams'
import Clients from './structure/Clients'
import Counter from './structure/Counter'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './utils/Header';
import { ModeToggle } from '@/components/mode-toggle';
import AnimatedPage from './utils/AnimatedPage';
import BrutalistFooter from './misc/footers/BrutalistFooter';
import Blogs from './structure/Blogs';
import Footer from './utils/Footer';
import AllBlogs from './AllBlogs';

export default function Home() {
  useEffect(() => {
    AOS.init();
    }, []);

  console.log('dibuat karena sudah capek dengan error wordpress, -- Una 4 Mar 2025')
  return (
    <div>
      <AnimatedPage>
      <Header />
      {/* <div data-aos='fade-up'> */}
        {/* <Jumbotron /> */}
      {/* </div> */}
      
      {/* <div data-aos='fade-up'> */}
        {/* <Clients /> */}
      {/* </div> */}
      
      {/* <div data-aos='fade-up'>
        <Services />
      </div>
      
      <div data-aos='fade-up'>
        <WhyChooseUs />
      </div>
      
      <div data-aos='fade-up'>
        <Portfolios />
      </div>
      
      <div data-aos='fade-up'>
        <Counter />
      </div>
      
      <div data-aos='fade-up'>
        <Teams />
      </div> */}

      <div data-aos='fade-up'>
        {/* <Blogs /> */}
        <AllBlogs />
      </div>

      {/* <div data-aos='fade-up'>
        <BrutalistFooter />
      </div> */}

      {/* <Footer /> */}
      
      <div className='fixed lg:bottom-12 bottom-8 lg:right-12 right-8'>
        <ModeToggle />
      </div>
      </AnimatedPage>
    </div>
  )
}
