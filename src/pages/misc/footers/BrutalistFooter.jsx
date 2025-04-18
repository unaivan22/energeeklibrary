import { Link } from 'react-router-dom';
import { ArrowUpRight, Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

export default function BrutalistFooter() {
  return (
    <footer className="w-full bg-[#DC2728] text-white font-mono border-t-4 border-white py-12">
      <div className="container mx-auto lg:px-[10vw] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase tracking-tighter">ENERGEEK</h2>
            <p className="text-sm uppercase">
                The E – Government Solution
              <br />
              EST. 2010
            </p>
            <p className="text-xs opacity-70 uppercase">
                Jl Baratajaya 3/16.
              <br />
              Surabaya, Jawa Timur
              <br />
              aditya.tanjung@energeek.co.id OR +62856-3306-260
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-tight border-b border-white pb-2">NAVIGATE</h3>
            <ul className="space-y-3">
              {["WORK", "ABOUT", "SERVICES", "CONTACT", "CAREERS"].map((item) => (
                <li key={item} className="group">
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm hover:bg-white hover:text-black transition-colors duration-200 py-1 px-2"
                  >
                    {item}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-tight border-b border-white pb-2">NEWSLETTER</h3>
            <p className="text-xs">SUBSCRIBE TO OUR RAW UPDATES</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="YOUR@EMAIL.COM"
                className="bg-transparent border border-white px-3 py-2 text-sm w-full sm:w-auto flex-grow placeholder:text-white focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-black px-4 py-2 text-sm font-bold hover:bg-gray-300 transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-4">
            <Link to="https://www.instagram.com/energeek.co.id/" target='_blank' className="hover:bg-white hover:text-black p-2 transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="https://www.facebook.com/energeekegovernmentsolution" target='_blank' className="hover:bg-white hover:text-black p-2 transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="https://www.linkedin.com/company/energeek/?originalSubdomain=id" target='_blank' className="hover:bg-white hover:text-black p-2 transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            {/* <Link href="#" className="hover:bg-white hover:text-black p-2 transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link> */}
          </div>
          <div className="text-xs md:text-right">
            <p>© {new Date().getFullYear()} ENERGEEK. ALL RIGHTS RESERVED.</p>
            <div className="mt-2 flex flex-wrap gap-4 md:justify-end">
              <Link href="#" className="hover:underline">
                PRIVACY POLICY
              </Link>
              <Link href="#" className="hover:underline">
                TERMS OF SERVICE
              </Link>
              <Link href="#" className="hover:underline">
                COOKIES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

