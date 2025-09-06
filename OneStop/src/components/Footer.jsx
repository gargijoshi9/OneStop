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
    <footer className="relative bg-black text-gray-300 pt-12 mt-auto overflow-hidden">
      {/* Glowing Gradient Top Border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent mb-4">
              UjjwAl Advisor
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Guiding students to make informed academic and career decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="flex items-center gap-2 text-gray-400 hover:text-white hover:translate-x-1 transition"
                >
                  <HomeIcon className="h-5 w-5 text-fuchsia-400" /> Home
                </a>
              </li>
              <li>
                <a
                  href="/aptitude-test"
                  className="flex items-center gap-2 text-gray-400 hover:text-white hover:translate-x-1 transition"
                >
                  <BeakerIcon className="h-5 w-5 text-blue-400" /> Aptitude Test
                </a>
              </li>
              <li>
                <a
                  href="/course-explorer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white hover:translate-x-1 transition"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-cyan-400" /> Course Explorer
                </a>
              </li>
              <li>
                <a
                  href="/college-directory"
                  className="flex items-center gap-2 text-gray-400 hover:text-white hover:translate-x-1 transition"
                >
                  <BuildingOfficeIcon className="h-5 w-5 text-purple-400" /> College Directory
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <address className="not-italic space-y-3">
              <p className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <EnvelopeIcon className="h-5 w-5 text-fuchsia-400" />
                ujjwal.admin@gmail.com
              </p>
              <p className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <PhoneIcon className="h-5 w-5 text-blue-400" />
                +91 1234567890
              </p>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">UjjwAI</span>. All rights reserved.
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            A Government Initiative for Educational Guidance
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
