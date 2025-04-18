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

export default function AddBlog() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        thumbnail: "",
    });

    const [file, setFile] = useState(null);
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            let thumbnailUrl = "";
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const uploadRes = await axios.post("/api/uploadblog.php", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                thumbnailUrl = uploadRes.data.url;
            }
    
            const payload = { ...form, thumbnail: thumbnailUrl };
    
            console.log("Payload yang dikirim:", payload); // 🔍 Debugging di frontend
    
            const res = await axios.post("/api/blogs.php", payload);
    
            console.log("Server response:", res.data); // 🔍 Debugging response dari backend
    
            if (res.data.success) {
                alert("Blog berhasil ditambahkan!");
                navigate('/admin');
            } else {
                alert("Gagal menambahkan blog: " + res.data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            console.log(error.response?.data); // 🔍 Debugging error dari server
            alert("Gagal menambahkan blog.");
        }
    };
    
    const handleQuillChange = (content) => {
        setForm((prevForm) => ({ ...prevForm, description: content }));
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
            <div className='container w-full mx-auto py-12'>
                <div className='flex flex-col gap-2 mb-8'>
                    <h1 className='text-2xl font-bold'>New Library</h1>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                            <BreadcrumbLink href="/#/admin">Admin</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                            <BreadcrumbPage>Add New Library</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Create Library</CardTitle>
                        <CardDescription>Fill in the forms below..</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='flex gap-4 min-h-[460px] relative'>
                            <div className='flex flex-col gap-8 w-full'>
                                <Input type="text" name="name" placeholder="Judul" value={form.name} onChange={handleInputChange} required />
                                <ReactQuill
                                    theme="snow"
                                    bounds=".quill-editor"
                                    modules={{ toolbar: fullToolbarOptions }}
                                    value={form.description}
                                    onChange={handleQuillChange}
                                    className="w-full h-[300px] mb-12 rounded"
                                />
                            </div>
                            <div className='flex flex-col gap-3 max-w-[300px]'>
                                <label className="text-gray-600">Thumbnail <br /> <span className='text-xs text-rose-500'>*Must .webp format for size optimize</span></label>
                                <Input type="file" accept=".webp" onChange={handleFileChange} className="border rounded p-2" />
                                {file && <img src={URL.createObjectURL(file)} alt="Preview" className="w-24 aspect-square object-cover border-2 border-black" />}
                            </div>

                            <div className='py-2 flex justify-end pt-12 absolute bottom-6 right-6'>
                                <Button type="submit">Simpan</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            }
        </div>
    );
}
