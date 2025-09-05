import {
  HomeIcon,
  BeakerIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">sAarthI Advisor</h3>
            <p className="text-gray-300">
              Guiding students to make informed academic and career decisions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <HomeIcon className="h-5 w-5" /> Home
                </a>
              </li>
              <li>
                <a href="/aptitude-test" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <BeakerIcon className="h-5 w-5" /> Aptitude Test
                </a>
              </li>
              <li>
                <a href="/course-explorer" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <MagnifyingGlassIcon className="h-5 w-5" /> Course Explorer
                </a>
              </li>
              <li>
                <a href="/college-directory" className="flex items-center gap-2 text-gray-300 hover:text-white">
                  <BuildingOfficeIcon className="h-5 w-5" /> College Directory
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5" /> Email: saarthi.admin@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5" /> Phone: +91 1234567890
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} sAarthI. All rights reserved.</p>
          <p className="mt-2">A Government Initiative for Educational Guidance</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;