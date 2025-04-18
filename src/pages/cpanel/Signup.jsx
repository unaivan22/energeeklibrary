import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Daftar() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/signup.php", form);
      if (res.data.success) navigate("/admin");
      else setError(res.data.message);
    } catch (err) {
      setError("Terjadi kesalahan");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border mb-2" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border mb-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border mb-2" />
        <button className="w-full p-2 bg-blue-500 text-white">Signup</button>
      </form>
    </div>
  );
}
