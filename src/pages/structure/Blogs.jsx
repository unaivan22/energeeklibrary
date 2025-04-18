import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/getBlogs.php");
      // Tambahkan estimasi waktu baca sebelum set state
      const blogsWithReadTime = res.data.map((blog) => ({
        ...blog,
        readTime: calculateReadingTime(blog.description),
      }));
      setBlogs(blogsWithReadTime);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(date);
  };

  // Fungsi untuk menghitung waktu baca
  const calculateReadingTime = (text) => {
    if (!text) return 1; // Default 1 menit jika teks kosong
    const wordsPerMinute = 200; // Kecepatan baca rata-rata
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute); // Hasil dalam menit
  };

  return (
    <div className='bg-black text-white'>
      <div className='container py-32'>
        <div className='flex flex-col gap-2 items-center'>
          <h2 className='text-4xl lg:max-w-[500px] font-semibold'>Blog</h2>
          <p className='opacity-50 text-md lg:max-w-[500px]'>Meet Our Professional Staff</p>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 py-24 pb-12 gap-6'>
          {blogs.slice(-3).map((blog) => (
            <Link to={`/blog/${blog.id}`} key={blog.id}>
              <div className='border border-white flex flex-col items-center rounded-xl p-6 gap-2 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] cursor-pointer'>
                {blog.thumbnail && <img src={blog.thumbnail} alt="blog" className='rounded-xl object-cover h-[280px] w-auto' />}
                <h1 className='text-xl font-semibold line-clamp-2'>{blog.name}</h1>
                <p className="italic text-sm opacity-70 font-light line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.description }} />
                {/* Tambahkan estimasi waktu baca */}
                <div className='flex items-center justify-between w-full'>
                  <p className="text-xs opacity-50 mt-2">{blog.readTime} min read</p>
                  <p className="text-xs opacity-50 mt-2">Published on {formatDate(blog.created_at)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className='flex items-center justify-center pt-12'>
          <a href='/#/blogs'>
            <Button className='rounded-full text-xl border-2 border-white px-6 py-10' size='lg' variant='outline'>
              Semua Blogs <ArrowUpRight className='w-4 h-4 ml-2' />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
