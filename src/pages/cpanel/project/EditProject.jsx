import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import "quill/dist/quill.core.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [client, setClient] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [newScreenshots, setNewScreenshots] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    axios.get(`/api/project.php?id=${id}`).then((res) => {
      setProject(res.data);
      setName(res.data.name);
      setDescription(res.data.description);
      setYear(res.data.year);
      setClient(res.data.client);
      setScreenshots(res.data.screenshots);
    });
  }, [id]);

  const handleFileChange = (e) => {
    setNewScreenshots(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Mengirim form...");
      
      let uploadedThumbnail = project.thumbnail;
      if (thumbnail) {
        const formData = new FormData();
        formData.append("file", thumbnail);
        formData.append("id", id); // Kirim ID blog
  
        console.log("Mengupload thumbnail...", thumbnail);
  
        const uploadRes = await axios.post("/api/upload_thumbnail.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        console.log("Response upload thumbnail:", uploadRes.data);
  
        uploadedThumbnail = uploadRes.data.fileUrl || uploadedThumbnail; // Periksa jika API mengembalikan path yang benar
      }
  
      let uploadedScreenshots = [...screenshots];
      if (newScreenshots.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < newScreenshots.length; i++) {
          formData.append("screenshots[]", newScreenshots[i]);
        }
  
        console.log("Mengupload screenshots...", newScreenshots);
  
        const uploadRes = await axios.post("/api/upload_screenshots.php", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        console.log("Response upload screenshots:", uploadRes.data);
  
        uploadedScreenshots = uploadRes.data.urls || [];
      }
  
      const projectData = {
        id,
        name,
        description,
        year,
        client,
        thumbnail: uploadedThumbnail,
        screenshots: uploadedScreenshots,
      };
  
      console.log("Mengirim data proyek:", projectData);
  
      const updateRes = await axios.post("/api/edit_project.php", projectData);
  
      console.log("Response update proyek:", updateRes.data);
  
      alert("Project berhasil diperbarui!");
      navigate("/admin");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Gagal memperbarui proyek, cek konsol untuk detail.");
    }
  };  
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Change the breakpoint as per your needs
  };

  window.addEventListener('resize', handleResize);

  // Cleanup function to remove the event listener
  return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, [])

  const fullToolbarOptions = [
    [{ 'header': '1'}, { 'header': '2'}],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['clean']
];
  

  return project ? (
    <div>
      <div>
            {isMobile ? <Forbidden /> : 
            <div className='container mx-auto py-12'>
                <div className='flex flex-col gap-2 mb-8'>
                    <h1 className='text-2xl font-bold'>Edit Project</h1>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                            <BreadcrumbLink href="/#/admin">Admin</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                            <BreadcrumbPage>Edit Project</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Edit new project</CardTitle>
                        <CardDescription>Make changes to your project here. Click save when you're done.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className='flex gap-12 items-start'>
                                <div className='flex flex-col gap-4 w-full'>
                                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    <div className='flex gap-4'>
                                      <Input type="text" value={client} onChange={(e) => setClient(e.target.value)} />
                                      <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                                    </div>
                                    <div className='flex flex-col gap-2 min-h-[280px]'>
                                        <label className="text-gray-600">Deskripsi</label>
                                        <ReactQuill
                                            theme="snow"
                                            bounds=".quill-editor"
                                            modules={{ toolbar: fullToolbarOptions }}
                                            value={description}
                                            onChange={setDescription} 
                                            className="w-full h-[200px] rounded"
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label className="text-gray-600">Screenshot Project <span className='text-xs text-rose-500'>*Must .webp format for size optimize</span></label>
                                          <div className="flex gap-2 flex-wrap">
                                            {screenshots.map((s, index) => (
                                              <img key={index} src={`/api/${s}`} alt="Screenshot" className="w-[150px] h-[150px] object-cover" />
                                            ))}
                                          </div>
                                          <Input type="file" multiple accept=".webp" onChange={handleFileChange} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 w-[350px]'>
                                    <div className='flex flex-col gap-1 items-start'>
                                        <label className="text-gray-600">Thumbnail <br /> <span className='text-xs text-rose-500'>*Must .webp format for size optimize</span></label>
                                        <Input type="file" accept=".webp" onChange={(e) => setThumbnail(e.target.files[0])} />
                                        {project.thumbnail && <img src={project.thumbnail} alt="Thumbnail" className="w-full h-[250px] object-cover" />}
                                    </div>
                                    {/* {thumbnailFile && <img src={URL.createObjectURL(thumbnailFile)} alt="Preview" className="h-[250px] object-cover w-full mt-2 border-2 border-black" />} */}
                                </div>
                            </div>
                            <div className="flex justify-end pt-12">
                                {/* <a href='/admin'><Button variant="outline">Cancel</Button></a> */}
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                    </CardContent>
                    </Card>
            </div>
            }
        </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
