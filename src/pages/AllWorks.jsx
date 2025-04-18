import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowUpRight, Asterisk, ChevronLeft, ChevronRight, PlusCircleIcon, Trash2 } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './utils/Header'
import { SpinningText } from '@/components/motion-primitives/spinning-text'
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ModeToggle } from '@/components/mode-toggle';
import { Link } from 'react-router-dom';
import AnimatedPage from './utils/AnimatedPage';
import ScrollToTop from './utils/ScrollToTop';
import { Input } from '@/components/ui/input';
import Footer from './utils/Footer';

export default function AllWorks() {
    const [projects, setProjects] = useState([]);
    const itemsPerPage = 20; 
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const res = await axios.get("/api/projects.php");
          setProjects(res.data);
        } catch (err) {
          console.error("Error fetching projects:", err);
          setError("Gagal memuat data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);

    const filteredProjects = projects
    .filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.id - a.id); // Urutkan dari ID terbesar ke terkecil

// Pagination logic
const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
const paginatedProjects = filteredProjects
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
};
    
const renderPagination = () => {
  const pages = [];
  if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
          pages.push(
              <PaginationItem key={i}>
                  <PaginationLink
                      onClick={() => handlePageChange(i)}
                      isActive={i === currentPage}
                  >
                      {i}
                  </PaginationLink>
              </PaginationItem>
          );
      }
  } else {
      const rangeStart = Math.max(2, currentPage - 1);
      const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

      pages.push(
          <PaginationItem key={1}>
              <PaginationLink
                  onClick={() => handlePageChange(1)}
                  isActive={currentPage === 1}
              >
                  1
              </PaginationLink>
          </PaginationItem>
      );

      if (rangeStart > 2) {
          pages.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      for (let i = rangeStart; i <= rangeEnd; i++) {
          pages.push(
              <PaginationItem key={i}>
                  <PaginationLink
                      onClick={() => handlePageChange(i)}
                      isActive={i === currentPage}
                  >
                      {i}
                  </PaginationLink>
              </PaginationItem>
          );
      }

      if (rangeEnd < totalPages - 1) {
          pages.push(<PaginationEllipsis key="end-ellipsis" />);
      }

      pages.push(
          <PaginationItem key={totalPages}>
              <PaginationLink
                  onClick={() => handlePageChange(totalPages)}
                  isActive={currentPage === totalPages}
              >
                  {totalPages}
              </PaginationLink>
          </PaginationItem>
      );
  }
  return pages;
};


  return (
    <div>
        <AnimatedPage>
        <ScrollToTop />
        <Header />
        <div id='gridz' className='container min-h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className='lg:text-[5rem] text-[2.5rem] lg:leading-[6rem] leading-[3rem] text-center font-semibold lg:px-32 px-6 w-full mt-12'>Our Works</h1>
                <p className='text-center lg:px-32 px-6 opacity-50'>INTERESTED IN OUR SERVICES?</p>
                <p className='text-center lg:px-32 px-6 opacity-50'> We are ready to accept requests for making website-based applications, mobile applications or infrastructure for your products / services.</p>
                <div className='flex lg:flex-row flex-col gap-4 py-4'>
                <a href='/contact' target='_blank'><Button className='rounded-full text-xl border-2 border-black' size='xxlg'>Contact Us <ArrowUpRight className='w-8 h-8 ml-2' /> </Button></a>
                {/* <Button className='rounded-full text-xl border-2 border-black' size='xxlg' variant='outline'>Contact Us <ArrowRight className='w-4 h-4 ml-2' /> </Button> */}
                </div>
            </div>
            <div className='absolute lg:top-[30vh] top-[20vh] lg:left-[20vw] left-[20vw]'>
                <SpinningText
                    radius={5}
                    fontSize={1.2}
                    className='font-medium leading-none'
                    >
                    {`Energeek • IT Consultant • Service • `}
                </SpinningText>
            </div>
            <div className='absolute lg:bottom-[30vh] bottom-[12vh] right-[20vw]'>
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
                    {`Our Works • Contact Us • Now • `}
                </SpinningText>
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
        <div className='bg-stone-100 dark:bg-stone-800'>
            <div className='container py-32'>
            <div className='flex lg:flex-row flex-col lg:items-center items-start lg:justify-between justify-start gap-6 z-[999]'>
                <div className='flex flex-col gap-2'>
                <h2 className='text-4xl lg:max-w-[800px] font-semibold'>OUR WORKS</h2>
                <p className='opacity-50 text-md lg:max-w-[800px]'>Berikut adalah beberapa aplikasi yang telah kami hasilkan, dan telah digunakan pada beberapa perusahaan BUMN dan Pemerintah Kota di Indonesia.</p>
                </div>
            </div>
            <div className='pt-6'>
                <Input
                    type="search"
                    placeholder="Cari projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border max-w-full md:w-[400px] order-2 md:order-1 mb-6"
                />
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 py-4 gap-6'>
              {paginatedProjects.length > 0 ? (
                  paginatedProjects
                      .sort((a, b) => b.id - a.id) // Urutkan dari ID terbesar ke terkecil
                      .map((project) => (
                          <Link to={`/project/${project.id}`} key={project.id}>
                              <div className='border border-black bg-stone-100 dark:bg-black flex flex-col rounded-xl p-6 gap-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] cursor-pointer'>
                                  <h1 className='text-3xl font-semibold line-clamp-2'>{project.name}</h1>
                                  <img className='rounded-xl object-cover h-[300px]' src={project.thumbnail} alt={project.nama} />
                                  <p className='text-sm italic opacity-70'>{project.client}</p>
                              </div>
                          </Link>
                      ))
              ) : (
                  <div>
                      <p className="text-center">Belum ada project.</p>
                  </div>
              )}
            </div>
            <div className='py-12'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <Button
                            variant='outline'
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                        >
                            First
                        </Button>
                        </PaginationItem>
                        <PaginationItem>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={() =>
                            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                            }
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft />
                        </Button>
                        </PaginationItem>
                        {renderPagination()}
                        <PaginationItem>
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={() =>
                            handlePageChange(
                                currentPage < totalPages ? currentPage + 1 : totalPages
                            )
                            }
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight />
                        </Button>
                        </PaginationItem>
                        <PaginationItem>
                        <Button
                            variant='outline'
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            Last
                        </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                </div>
            </div>
        </div>
        <div className='fixed lg:bottom-12 bottom-8 lg:right-12 right-8'>
            <ModeToggle />
        </div>
        </AnimatedPage>
        <Footer />
    </div>
  )
}
