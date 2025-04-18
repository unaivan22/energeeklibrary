import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [editData, setEditData] = useState(null);
  const [file, setFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Track modal visibility
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("/api/getTeams.php");
      setTeams(res.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleEdit = (team) => {
    setEditData(team);
    setFile(null);
    setIsDialogOpen(true); // Open the dialog
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editData.id);
      formData.append("name", editData.name);
      formData.append("role", editData.role);
      formData.append("email", editData.email);
      if (file) formData.append("file", file);

      const res = await axios.post("/api/updateTeam.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Team berhasil diperbarui!");
        setIsDialogOpen(false); // Close modal
        fetchTeams();
      } else {
        alert("Gagal memperbarui team: " + res.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal memperbarui team.");
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.role.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  return (
    <div className="py-6">
      <div className="flex flex-row items-center pb-6 gap-4">
        <h1 className="text-xl font-semibold">Daftar Teams</h1>
        <a href="/#/team/add">
          <Button className='rounded-xl'>Add New</Button>
        </a>
      </div>
      <Input
        type="search"
        placeholder="Cari teams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 max-w-full md:w-[400px]"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className='w-[120px] text-center'>*</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTeams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>
                {team.photo && <img src={team.photo} alt="Team" className="w-16 h-16 rounded-lg object-cover" />}
              </TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.email}</TableCell>
              <TableCell>{team.role}</TableCell>
              <TableCell className='w-[120px] text-center'>
                <Button variant='outline' className='rounded-2xl' onClick={() => handleEdit(team)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="p-6 border-2 border-black">
          <h2 className="text-lg font-semibold mb-4">Edit Team</h2>
          {editData && (
            <>
              <Input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Name"
                className="mb-2"
              />
              <Input
                type="text"
                value={editData.role}
                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                placeholder="Role"
                className="mb-2"
              />
              <Input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                placeholder="Email"
                className="mb-2"
              />
              <label className="text-gray-600">Update Photo</label>
              <div className="flex items-center gap-4">
                {editData.photo && <img src={editData.photo} alt="Team" className="w-[200px] h-[200px] border-2 border-black object-cover" />}
                <ArrowRight />
                {file && <img src={URL.createObjectURL(file)} alt="Preview" className="w-[200px] h-[200px] border-2 border-black object-cover" />}
              </div>
              <input type="file" accept=".webp" onChange={handleFileChange} className="border rounded p-2 mb-2" />

              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleUpdate}>
                  Update
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
