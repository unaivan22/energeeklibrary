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

export default function AddTeam() {
    const [form, setForm] = useState({
        name: "",
        role: "",
        email: "",
        photo: "",
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
            let photoUrl = "";
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const uploadRes = await axios.post("/api/uploadteam.php", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                photoUrl = uploadRes.data.url;
            }
    
            const payload = { ...form, photo: photoUrl };
    
            console.log("Payload yang dikirim:", payload); // 🔍 Debugging di frontend
    
            const res = await axios.post("/api/teams.php", payload);
    
            console.log("Server response:", res.data); // 🔍 Debugging response dari backend
    
            if (res.data.success) {
                alert("Team berhasil ditambahkan!");
                navigate('/admin');
            } else {
                alert("Gagal menambahkan teams: " + res.data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            console.log(error.response?.data); // 🔍 Debugging error dari server
            alert("Gagal menambahkan team.");
        }
    };
    

    return (
        <div>
            {isMobile ? <Forbidden /> : 
            <div className='container max-w-3xl mx-auto py-12'>
                <div className='flex flex-col gap-2 mb-8'>
                    <h1 className='text-2xl font-bold'>New Team</h1>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                            <BreadcrumbLink href="/#/admin">Admin</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                            <BreadcrumbPage>Add New Team</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Create Team</CardTitle>
                        <CardDescription>Fill in the forms below..</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <Input type="text" name="name" placeholder="Name" value={form.name} onChange={handleInputChange} required />
                            <Input type="text" name="role" placeholder="Role" value={form.role} onChange={handleInputChange} required />
                            <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} required />
                            
                            <div className='flex flex-col gap-3'>
                                <label className="text-gray-600">Photo</label>
                                <Input type="file" accept=".webp" onChange={handleFileChange} className="border rounded p-2" />
                                {file && <img src={URL.createObjectURL(file)} alt="Preview" className="w-24 aspect-square object-cover border-2 border-black" />}
                            </div>

                            <div className='py-2 flex justify-end pt-12'>
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
