import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Header from "@/pages/utils/Header";
import AnimatedPage from "@/pages/utils/AnimatedPage";
import BrutalistFooter from "@/pages/misc/footers/BrutalistFooter";
import Footer from "@/pages/utils/Footer";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/get_blog.php?id=${id}`)
      .then((res) => {
        if (res.data.success) {
          const blogData = res.data.blog;
          // Hitung waktu baca sebelum set state
          blogData.readTime = calculateReadingTime(blogData.description);
          setBlog(blogData);
        }
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(date);
  };

  const calculateReadingTime = (text) => {
    if (!text) return 1; // Default 1 menit jika teks kosong
    const wordsPerMinute = 200; // Kecepatan baca rata-rata
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute); // Hasil dalam menit
  };

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <AnimatedPage>
        <Header />
        <div className="container mx-auto lg:pb-12 pb-4 pt-32">
          <Helmet>
            <title>{blog.name} - Careers at Energeek</title>
          </Helmet>
          <div className="flex items-center justify-center w-full pb-4">
            <div className="px-3 py-1 rounded-2xl text-xs font-light bg-rose-100 text-rose-500">
              {formatDate(blog.created_at)}
            </div>
            <div className="px-3 py-2 rounded-full text-xs font-light opacity-60">
              • <span className="ml-2">{blog.readTime} min read</span>
            </div>
          </div>
          <h1 className="lg:text-[4rem] text-[2rem] font-bold mb-6 text-center">{blog.name}</h1>
        </div>

        <div className="pt-4 pb-12 w-screen overflow-x-hidden">
          <div className="container">
            <img src={blog.thumbnail} alt={blog.name} className="w-full rounded-lg shadow-lg mb-6" />
          </div>
        </div>

        <div className="container pb-[32vh]">
          <div className="prose max-w-none quill-detailnya" dangerouslySetInnerHTML={{ __html: blog.description }} />
        </div>
      </AnimatedPage>
      {/* <Footer /> */}
    </div>
  );
}
