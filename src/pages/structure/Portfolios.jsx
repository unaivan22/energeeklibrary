import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Portfolios() {
  const [projects, setProjects] = useState([]);
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
  return (
    <div className='bg-stone-100 dark:bg-stone-800'>
      <div className='container py-32'>
        <div className='flex lg:flex-row flex-col lg:items-center items-start lg:justify-between justify-start gap-6'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-4xl lg:max-w-[500px] font-semibold'>OUR WORKS</h2>
            <p className='opacity-50 text-md lg:max-w-[500px]'>Berikut adalah beberapa aplikasi yang telah kami hasilkan, dan telah digunakan pada beberapa perusahaan BUMN dan Pemerintah Kota di Indonesia.</p>
          </div>
          <a href='/#/works'><Button className='rounded-full text-xl border-2 border-black px-6 py-10' size='lg' variant='outline'>Semua Project <ArrowUpRight className='w-4 h-4 ml-2' /> </Button></a>
        </div>
        <div className='grid lg:grid-cols-2 grid-cols-1 py-12 gap-6'>
          {projects.length > 0 ? (
            projects.slice(0,4).map((project) => (
              <Link to={`/project/${project.id}`} >
              <div key={project.id} className='border border-black bg-stone-100 dark:bg-black flex flex-col rounded-xl p-6 gap-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] cursor-pointer'>
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
      </div>
    </div>
  )
}