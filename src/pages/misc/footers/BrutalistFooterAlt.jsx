import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

export default function BrutalistFooterAlt() {
  return (
    <footer className="w-full bg-white text-black font-mono border-t-8 border-black">
      <div className="container mx-auto">
        {/* Top Section with Grid */}
        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-12 md:col-span-4 p-6 border-r border-black">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">BRUTALIST</h2>
            <p className="text-sm mb-6">DESIGN COLLECTIVE SINCE 2024</p>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <p className="text-xs">
                  CONCRETE TOWER, 404 BRUTALIST AVENUE
                  <br />
                  GRID CITY, BT 10101
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <p className="text-xs">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <p className="text-xs">HELLO@BRUTALIST.COM</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 h-full">
              {/* Services */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-black">
                <h3 className="text-lg font-bold mb-4 uppercase">Services</h3>
                <ul className="space-y-2">
                  {["ARCHITECTURE", "INTERIOR", "BRANDING", "DIGITAL", "PRODUCT"].map((item) => (
                    <li key={item} className="group">
                      <Link
                        href="#"
                        className="inline-flex items-center text-xs hover:bg-black hover:text-white transition-colors py-1 px-2"
                      >
                        {item}
                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-black">
                <h3 className="text-lg font-bold mb-4 uppercase">Company</h3>
                <ul className="space-y-2">
                  {["ABOUT", "TEAM", "CAREERS", "PRESS", "CONTACT"].map((item) => (
                    <li key={item} className="group">
                      <Link
                        href="#"
                        className="inline-flex items-center text-xs hover:bg-black hover:text-white transition-colors py-1 px-2"
                      >
                        {item}
                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4 uppercase">Updates</h3>
                <p className="text-xs mb-4">JOIN OUR RAW NEWSLETTER</p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="YOUR@EMAIL.COM"
                    className="w-full bg-transparent border border-black px-3 py-2 text-xs placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button className="w-full bg-black text-white px-4 py-2 text-xs font-bold hover:bg-gray-800 transition-colors">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 p-6">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {["FACEBOOK", "INSTAGRAM", "TWITTER", "LINKEDIN"].map((platform) => (
              <Link
                key={platform}
                href="#"
                className="text-xs hover:bg-black hover:text-white px-2 py-1 transition-colors"
              >
                {platform}
              </Link>
            ))}
          </div>
          <div className="text-xs md:text-right">
            <p>© {new Date().getFullYear()} BRUTALIST DESIGN COLLECTIVE</p>
            <div className="mt-2 flex flex-wrap gap-4 md:justify-end">
              <Link href="#" className="hover:underline">
                PRIVACY
              </Link>
              <Link href="#" className="hover:underline">
                TERMS
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

