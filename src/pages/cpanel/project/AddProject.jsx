import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "quill/dist/quill.core.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import Forbidden from '@/pages/misc/Forbidden';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function AddProject() {
    const [form, setForm] = useState({
        name: "",
        client: "",
        year: "",
        description: "",
        thumbnail: "",
        screenshots: [], // Untuk menyimpan URL screenshot
    });

    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [screenshotFiles, setScreenshotFiles] = useState([]); // State untuk multiple images
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

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

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleQuillChange = (content) => {
        setForm((prevForm) => ({ ...prevForm, description: content }));
    };

    const handleThumbnailChange = (e) => {
        setThumbnailFile(e.target.files[0]);
    };

    const handleScreenshotChange = (e) => {
        setScreenshotFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let thumbnailUrl = "";
            if (thumbnailFile) {
                const formData = new FormData();
                formData.append("file", thumbnailFile);
                const uploadRes = await axios.post("/api/upload.php", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                thumbnailUrl = uploadRes.data.url;
            }

            let screenshotUrls = [];
            if (screenshotFiles.length > 0) {
                const formData = new FormData();
                screenshotFiles.forEach(file => formData.append("screenshots[]", file));
                const uploadRes = await axios.post("/api/upload_screenshots.php", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                screenshotUrls = uploadRes.data.urls;
            }

            const payload = { 
                ...form, 
                thumbnail: thumbnailUrl, 
                screenshots: screenshotUrls 
            };

            console.log("Payload yang dikirim:", payload);

            const res = await axios.post("/api/projects.php", payload);

            console.log("Server response:", res.data);

            if (res.data.success) {
                alert("Project berhasil ditambahkan!");
                navigate('/admin');
            } else {
                alert("Gagal menambahkan project: " + res.data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menambahkan project.");
        }
    };

    const fullToolbarOptions = [
        [{ 'header': '1'}, { 'header': '2'}],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ['clean']
    ];

    return (
        <div>
            {isMobile ? <Forbidden /> : 
            <div className='container mx-auto py-12'>
                <div className='flex flex-col gap-2 mb-8'>
                    <h1 className='text-2xl font-bold'>New Project</h1>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                            <BreadcrumbLink href="/#/admin">Admin</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                            <BreadcrumbPage>Add New Project</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Create new project</CardTitle>
                        <CardDescription>Fill in the forms below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className='flex gap-12 items-start'>
                                <div className='flex flex-col gap-4 w-full'>
                                    <Input type="text" name="name" placeholder="Judul" value={form.name} onChange={handleInputChange} required />
                                    <div className='flex gap-4'>
                                        <Input type="text" name="client" placeholder="Client" value={form.client} onChange={handleInputChange} required />
                                        <Input type="text" name="year" placeholder="Tahun" value={form.year} onChange={handleInputChange} required />
                                    </div>
                                    <div className='flex flex-col gap-2 min-h-[280px]'>
                                        <label className="text-gray-600">Deskripsi</label>
                                        <ReactQuill
                                            theme="snow"
                                            bounds=".quill-editor"
                                            modules={{ toolbar: fullToolbarOptions }}
                                            value={form.description}
                                            onChange={handleQuillChange}
                                            className="w-full h-[200px] rounded"
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label className="text-gray-600">Screenshot Project <span className='text-xs text-rose-500'>*Must .webp format for size optimize</span></label>
                                        <Input type="file" multiple accept=".webp" onChange={handleScreenshotChange} className="border rounded p-2" />
                                        {screenshotFiles.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {screenshotFiles.map((file, index) => (
                                                    <img key={index} src={URL.createObjectURL(file)} alt="Screenshot" className="w-24 aspect-square object-cover border-2 border-black" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 w-[350px]'>
                                    <div className='flex flex-col gap-1 items-start'>
                                        <label className="text-gray-600">Thumbnail <br /> <span className='text-xs text-rose-500'>*Must .webp format for size optimize</span></label>
                                        <Input type="file" accept=".webp" onChange={handleThumbnailChange} className="border rounded p-2 w-full" />
                                    </div>
                                    {thumbnailFile && <img src={URL.createObjectURL(thumbnailFile)} alt="Preview" className="h-[250px] object-cover w-full mt-2 border-2 border-black" />}
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
    );
}
