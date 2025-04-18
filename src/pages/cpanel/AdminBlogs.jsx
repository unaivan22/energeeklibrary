import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ChevronLeft, ChevronRight, PlusCircleIcon, Trash2 } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from '@/components/ui/input';

export default function AdminBlogs() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 20; 
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/getBlogs.php");
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

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects
      .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically A to Z
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  );

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
            //   href="#"
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
            // href="#"
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
            //   href="#"
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
            // href="#"
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(date);
  };

  return (
    <div className='py-6'>
      <div className="flex flex-row items-center pb-6 gap-4">
        <h1 className="text-xl font-semibold">Daftar Library</h1>
        <a href="/#/blog/add">
          <Button className='rounded-xl'>Add New</Button>
        </a>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div>
          <Input
              type="search"
              placeholder="Cari libraries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded max-w-full md:w-[400px] order-2 md:order-1 mb-6"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[120px]'>Thumbnail</TableHead>
                <TableHead>Nama</TableHead>
                {/* <TableHead>Deskripsi</TableHead> */}
                <TableHead>Tanggal</TableHead>
                <TableHead className='w-[120px] text-center'>*</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProjects.length > 0 ? (
                paginatedProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <img src={project.thumbnail} alt={project.nama} className="w-20 h-12 object-cover rounded" />
                    </TableCell>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    {/* <TableCell className='' dangerouslySetInnerHTML={{ __html: project.description }}></TableCell> */}
                    <TableCell>{formatDate(project.created_at)}</TableCell>
                    <TableCell className='text-center'>
                      <a href={`/#/admin/blog/edit/${project.id}`}>
                        <Button variant='outline' className='rounded-2xl'>Edit</Button>
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center">Belum ada project.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
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
  );
}
