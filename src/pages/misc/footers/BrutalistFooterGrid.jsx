import { Link } from 'react-router-dom';

export default function BrutalistFooterGrid() {
  return (
    <footer className="w-full font-mono text-sm">
      <div className="grid grid-cols-12 border-t-4 border-black">
        {/* Logo Cell */}
        <div className="col-span-12 md:col-span-3 bg-black text-white p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-2">GRID</h2>
            <p className="text-xs mb-4">BRUTALIST DESIGN STUDIO</p>
          </div>
          <p className="text-xs opacity-70">© {new Date().getFullYear()} GRID STUDIO</p>
        </div>

        {/* Contact Info */}
        <div className="col-span-12 md:col-span-3 p-4 border-b border-black">
          <h3 className="uppercase font-bold mb-4 border-b border-black pb-2">CONTACT</h3>
          <address className="not-italic text-xs space-y-2">
            <p>123 CONCRETE BLOCK</p>
            <p>BRUTALIST CITY, BT 10101</p>
            <p className="mt-4">TEL: (555) 123-4567</p>
            <p>EMAIL: INFO@GRID.COM</p>
          </address>
        </div>

        {/* Navigation */}
        <div className="col-span-6 md:col-span-3 p-4 border-b border-l border-black">
          <h3 className="uppercase font-bold mb-4 border-b border-black pb-2">SITE</h3>
          <ul className="text-xs space-y-2">
            {["HOME", "WORK", "ABOUT", "SERVICES", "CONTACT"].map((item) => (
              <li key={item}>
                <Link href="#" className="block hover:bg-black hover:text-white transition-colors py-1 px-2">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="col-span-6 md:col-span-3 p-4 border-b border-l border-black">
          <h3 className="uppercase font-bold mb-4 border-b border-black pb-2">SOCIAL</h3>
          <ul className="text-xs space-y-2">
            {["INSTAGRAM", "TWITTER", "LINKEDIN", "BEHANCE", "DRIBBBLE"].map((item) => (
              <li key={item}>
                <Link href="#" className="block hover:bg-black hover:text-white transition-colors py-1 px-2">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-12 p-4 border-t border-black">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="uppercase font-bold">NEWSLETTER</h3>
              <p className="text-xs">SUBSCRIBE FOR BRUTALIST UPDATES</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="YOUR@EMAIL.COM"
                className="bg-transparent border border-black px-3 py-2 text-xs w-full md:w-auto placeholder:text-gray-500 focus:outline-none"
              />
              <button className="bg-black text-white px-4 py-2 text-xs font-bold hover:bg-gray-800 transition-colors whitespace-nowrap">
                SIGN UP
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black flex flex-col md:flex-row justify-between text-xs">
            <p>ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
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

