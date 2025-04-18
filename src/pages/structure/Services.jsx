import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Services() {
  return (
    <div className='bg-stone-100 dark:bg-stone-900' id='ourservices'>
      <div className='container py-32'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-4xl lg:max-w-[500px] font-semibold'>Advanced Solutions Tailored to Your Needs</h2>
          <p className='opacity-50 text-md lg:max-w-[500px]'>Committed to excellence, our company delivers unparalleled Reliable Technology Services, ensuring each client benefits from superior, and consistent</p>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 py-12 gap-4'>
          <Card className="w-full hover:bg-[#D3E671] dark:hover:text-black">
            <CardHeader>
              <CardTitle className='text-3xl border-b border-black dark:border-white dark:hover:border-black pb-8'>Web Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='opacity-70 text-md mb-8'>Perusahaan kami yang bergerak dibidang website dan aplikasi, banyak mengembangkan aplikasi berbasis website, dimana aplikasi tersebut dapat dengan mudah diakses oleh pelanggan kami tanpa menguras isi hard disk, karena kami memiliki penyimpanan bersistem cloud.</p>
              <img src='/media/webapp.svg' />
            </CardContent>
          </Card>
          <Card className="w-full hover:bg-[#D3E671] dark:hover:text-black">
            <CardHeader>
              <CardTitle className='text-3xl border-b border-black dark:border-white dark:hover:border-black pb-8'>Mobile Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='opacity-70 text-md mb-8'>Dengan tenaga yang handal dan profesional, sampai saat ini perusahaan kami juga ikut serta dalam mempublish dan mengembangkan beberapa aplikasi dalam sistem smartphone (mobile) dengan berbagai macam tipe aplikasi.</p>
              <img src='/media/mobileapp.svg' />
            </CardContent>
          </Card>
          <Card className="w-full hover:bg-[#D3E671] dark:hover:text-black">
            <CardHeader>
              <CardTitle className='text-3xl border-b border-black dark:border-white dark:hover:border-black pb-8'>Infrastructure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='opacity-70 text-md mb-8'>Infrastructure merupakan backbone utama dalam sebuah solusi yg diberikan. Solusi Infrastructure kami disini meliputi pengadaan server, firewall, maintenance nya sampai pengadaan Komputer Client.</p>
              <img src='/media/infrastructure.svg' />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
