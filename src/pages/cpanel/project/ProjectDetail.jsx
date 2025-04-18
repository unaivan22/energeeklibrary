import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Header from "@/pages/utils/Header";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import AnimatedPage from "@/pages/utils/AnimatedPage";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`/api/get_project.php?id=${id}`).then((res) => {
      if (res.data.success) {
        setProject(res.data.project);
        setImages([res.data.project.thumbnail, ...JSON.parse(res.data.project.screenshots || "[]").map(img => `/api/${img}`)]);
      }
    });
  }, [id]);

  if (!project) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <AnimatedPage>
        <Header />
        <div className="container mx-auto lg:pb-12 pb-4 pt-32">
          <Helmet>
            <title>{project.name} - Careers at Energeek</title>
          </Helmet>
          <div className="flex items-center justify-center w-full pb-4">
            <div className="px-3 py-1 rounded-2xl text-xs font-light bg-rose-100 text-rose-500">
              {project.year}
            </div>
            <div className="px-3 py-2 rounded-full text-xs font-light opacity-60">
              {project.client}
            </div>
          </div>
          <h1 className="lg:text-[4rem] text-[2rem] font-bold mb-6 text-center">{project.name}</h1>
        </div>

        <div className="pt-4 pb-12 w-screen overflow-x-hidden">
          <div className="container">
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full rounded-lg shadow-lg mb-6 cursor-pointer"
              onClick={() => {
                setPhotoIndex(0);
                setIsOpen(true);
              }}
            />
          </div>
          <InfiniteSlider speedOnHover={10} gap={32}>
            {JSON.parse(project.screenshots || "[]").map((img, index) => (
              <img
                key={index}
                src={`/api/${img}`}
                alt={`Screenshot ${index + 1}`}
                className="w-full lg:h-[250px] h-[180px] rounded-lg shadow cursor-pointer"
                onClick={() => {
                  setPhotoIndex(index + 1);
                  setIsOpen(true);
                }}
              />
            ))}
          </InfiniteSlider>
        </div>

        <div className="container pb-24">
          <div
            className="prose max-w-none quill-detailnya"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>

        {/* Lightbox */}
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={photoIndex}
          slides={images.map((src) => ({ src }))}
          on={{ view: ({ index }) => setPhotoIndex(index) }}
        />
      </AnimatedPage>
    </div>
  );
}
