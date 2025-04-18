import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import React from 'react';

const ClearCookies = () => {
    const handleRefresh = () => {
    window.location.reload();
    };

  const clearAllStorage = () => {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear cookies
    clearCookies();
    
    alert('Session have been cleared!');
    handleRefresh()
  };

  const clearCookies = () => {
    document.cookie.split(';').forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  };

  return (
    <div className='w-full'>
      <Button variant='outline' onClick={clearAllStorage} className="rounded-xl w-full">
        Keluar
        <LogOut className='w-4 h-4 ml-2' />
      </Button>
    </div>
  );
};

export default ClearCookies;