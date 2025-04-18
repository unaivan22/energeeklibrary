import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home'
import Admin from './cpanel/Admin'
import AddProject from './cpanel/project/AddProject';
import AddTeam from './cpanel/team/AddTeam';
import Login from './cpanel/Login';
import Daftar from './cpanel/Signup';
import ProjectDetail from './cpanel/project/ProjectDetail';
import EditProject from './cpanel/project/EditProject';
import AllTeams from './AllTeams';
import AllWorks from './AllWorks';
import AddBlog from './cpanel/blog/AddBlog';
import EditBlog from './cpanel/blog/EditBlog';
import BlogDetail from './cpanel/blog/BlogDetail';
import AllBlogs from './AllBlogs';

export default function RouterPage() {
  const isAuthenticated = sessionStorage.getItem('adminAuth');
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route 
              path="/admin" 
              element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} 
            />
            
            <Route path="/login" element={<Login />} />
            {/* <Route path='/admin' element={<Admin/>} /> */}

            <Route 
              path="/project/add" 
              element={isAuthenticated ? <AddProject /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin/project/edit/:id" 
              element={isAuthenticated ? <EditProject /> : <Navigate to="/login" />} 
            />
            <Route path="/project/:id" element={<ProjectDetail />} />

            <Route 
              path="/blog/add" 
              element={isAuthenticated ? <AddBlog /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin/blog/edit/:id" 
              element={isAuthenticated ? <EditBlog /> : <Navigate to="/login" />} 
            />
            <Route path="/blog/:id" element={<BlogDetail />} />


            <Route path='/team/add' element={<AddTeam/>} />
            {/* <Route path='*' element={<NotFound/>} /> */}

            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Daftar/>} />

            <Route path='/teams' element={<AllTeams/>} />
            <Route path='/works' element={<AllWorks/>} />
            <Route path='/blogs' element={<AllBlogs/>} />

        </Routes>
     </Router>
  )
}