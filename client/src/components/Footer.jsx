import React from "react";
import Logo from "../assets/images/Logo-1.png"; // Assuming your logo file is here
import { YouTube, Instagram, Facebook } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-screen-xl mx-auto py-16 px-8">
        {/* Main footer content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Column 1: Logo and Brand Info */}
          <div className="flex flex-col items-center md:items-start">
            {/* ✅ Using a filter to brighten the logo on dark background, can be removed if your logo is already bright */}
            <img
              src={Logo}
              alt="GymX Logo"
              className="w-40 mb-4 brightness-200"
            />
            {/* ✅ Increased text brightness for readability */}
            <p className="text-gray-300 text-sm max-w-xs">
              Your ultimate fitness partner. Find the best exercises tailored
              for you.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            {/* ✅ Softened the heading color slightly */}
            <h3 className="font-bold text-lg mb-4 tracking-wider uppercase text-gray-100">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-3">
              {/* ✅ Made links much brighter (gray-200) for high contrast */}
              <a
                href="/"
                className="text-gray-200 hover:text-[#FF2625] transition-colors duration-300 hover:underline"
              >
                Home
              </a>
              <a
                href="#exercises"
                className="text-gray-200 hover:text-[#FF2625] transition-colors duration-300 hover:underline"
              >
                Exercises
              </a>
              <a
                href="#contact"
                className="text-gray-200 hover:text-[#FF2625] transition-colors duration-300 hover:underline"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wider uppercase text-gray-100">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start gap-x-6">
              {/* ✅ Made icons brighter to match the links */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-200 hover:text-[#FF2625] transition-transform duration-300 hover:scale-125"
              >
                <YouTube sx={{ fontSize: 30 }} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-200 hover:text-[#FF2625] transition-transform duration-300 hover:scale-125"
              >
                <Instagram sx={{ fontSize: 30 }} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-200 hover:text-[#FF2625] transition-transform duration-300 hover:scale-125"
              >
                <Facebook sx={{ fontSize: 30 }} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="text-sm">
            © {new Date().getFullYear()} GymX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
