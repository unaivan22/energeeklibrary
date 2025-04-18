import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin'); // Default role for sign-up
  const navigate = useNavigate();
  const [isLoadingStart, setLoadingStart] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('adminAuth', true); // Store authentication flag
        sessionStorage.setItem('userDetails', JSON.stringify(data.user)); // Store user details
        setLoadingStart(true);
        alert(data.message); // Optional: Show success message
        navigate('/admin'); // Redirect to admin page
      } else {
        const error = await response.json();
        alert(error.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('/api/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensure credentials are included for CORS
        body: JSON.stringify({
          action: 'create',
          username,
          email,
          password,
          role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setIsSignUp(false); // Switch to login after successful sign-up
      } else {
        const error = await response.json();
        alert(error.message || 'Error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  const handleRefresh = () => {
    window.location.reload();
    };
  // Check if the session is active on component mount
  useEffect(() => {
    const adminAuth = sessionStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      // If session is active, redirect to /admin
      navigate('/admin');
      handleRefresh();
    }
  }, [navigate]);

  return (
    <div className=''>
      <div className="flex items-center justify-center h-screen ">
        <div className="pt-12 px-8 pb-12 border-2 border-black shadow-lg w-80">
          <img src='/elogo.svg' className='h-6 mb-2' />
          <h1 className="text-2xl font-bold mb-4">
            {isSignUp ? 'Admin Sign Up' : 'Admin Login'}
          </h1>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-2xl w-full mb-4"
          />
          {isSignUp && (
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-2xl w-full mb-4"
            />
          )}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl w-full mb-4"
          />
          {isSignUp && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-2xl p-2 w-full mb-4 dark:bg-black"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          )}
          <Button
            onClick={isSignUp ? handleSignUp : handleLogin}
            className="rounded-full w-full"
          >
            {isLoadingStart && <Loader className="animate-spin mr-2 h-4 w-4" /> }
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
          <p
            onClick={() => setIsSignUp(!isSignUp)}
            className="underline text-center mt-4 cursor-pointer text-sm"
          >
            {isSignUp
              ? 'Already have an account? Log in'
              : "Don't have an account? Sign up"}
          </p>
          <div className='w-full mt-12'>
            <a className='w-full' href='/'>
              <Button className='w-full' variant='secondary'> <ArrowLeft className='w-4 h-4 mr-2' /> Back to Home</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;