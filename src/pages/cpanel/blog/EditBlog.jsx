import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import "quill/dist/quill.core.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState(null);

  useEffect(() => {
    axios.get(`/api/blog.php?id=${id}`).then((res) => {
      setBlog(res.data);
      setName(res.data.name);
      setDescription(res.data.description);
      setPreviewThumbnail(res.data.thumbnail);
    });
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedThumbnail = blog.thumbnail;

      if (thumbnail) {
        const formData = new FormData();
        formData.append("file", thumbnail);
        formData.append("id", id); // Kirim ID blog

        const uploadRes = await axios.post(
          "/api/upload_blog_thumbnail.php",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (uploadRes.data.success) {
          uploadedThumbnail = uploadRes.data.fileUrl;
        }
      }

      const blogData = {
        id,
        name,
        description,
        thumbnail: uploadedThumbnail,
      };

      await axios.post("/api/edit_blog.php", blogData);

      alert("Blog berhasil diperbarui!");
      navigate("/admin");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Gagal memperbarui blog, cek konsol untuk detail.");
    }
  };

  const fullToolbarOptions = [
    [{ 'header': '1' }, { 'header': '2' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['image'], // tambahin image di toolbar
    ['clean']
  ];

  return blog ? (
    <div className="container mx-auto py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold">Edit Library</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/#/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Library</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
          <CardDescription>Edit blog dan simpan perubahan.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-12 items-start">
              <div className="flex flex-col gap-4 w-full">
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600">Deskripsi</label>
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    className="w-full h-[300px] rounded"
                    modules={{ toolbar: fullToolbarOptions }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-[350px]">
                <label className="text-gray-600">
                  Thumbnail <br />
                  <span className="text-xs text-rose-500">*Format .webp untuk optimasi</span>
                </label>
                <Input type="file" accept=".webp" onChange={handleFileChange} />
                {previewThumbnail && <img src={previewThumbnail} alt="Thumbnail" className="w-full h-[250px] object-cover" />}
              </div>
            </div>
            <div className="flex justify-end pt-12">
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : (
    <p className="grid h-screen place-items-center">Loading...</p>
  );
}
