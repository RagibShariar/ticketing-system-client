import "@/app/globals.css";
import logo from "@/assets/logo.png";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#041340] py-10 font-sans tracking-wide">
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 py-8 max-w-7xl mx-auto">
        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">About Us</h4>
          <p className="text-gray-400 text-base">
            We create IT solutions that are easy to use, efficient, secure, and
            reliable.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">Follow Us</h4>

          <ul className="flex flex-wrap gap-x-5 gap-4">
            <li>
              <a href="javascript:void(0)" className="text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline w-6 h-6"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#1877f2"
                    d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z"
                    data-original="#1877f2"
                  />
                  <path
                    fill="#fff"
                    d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z"
                    data-original="#ffffff"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a href="javascript:void(0)" className="text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline w-6 h-6"
                  viewBox="0 0 176 176"
                >
                  <g data-name="Layer 2">
                    <rect
                      width="176"
                      height="176"
                      fill="#0077b5"
                      data-original="#0077b5"
                      rx="24"
                    />
                    <path
                      fill="#fff"
                      d="M63.4 48a15 15 0 1 1-15-15 15 15 0 0 1 15 15zM60 73v66.27a3.71 3.71 0 0 1-3.71 3.73H40.48a3.71 3.71 0 0 1-3.72-3.72V73a3.72 3.72 0 0 1 3.72-3.72h15.81A3.72 3.72 0 0 1 60 73zm82.64 34.5v32.08a3.41 3.41 0 0 1-3.42 3.42h-17a3.41 3.41 0 0 1-3.42-3.42v-31.09c0-4.64 1.36-20.32-12.13-20.32-10.45 0-12.58 10.73-13 15.55v35.86A3.42 3.42 0 0 1 90.3 143H73.88a3.41 3.41 0 0 1-3.41-3.42V72.71a3.41 3.41 0 0 1 3.41-3.42H90.3a3.42 3.42 0 0 1 3.42 3.42v5.78c3.88-5.82 9.63-10.31 21.9-10.31 27.18 0 27.02 25.38 27.02 39.32z"
                      data-original="#ffffff"
                    />
                  </g>
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="text-lg font-semibold mb-6 text-white">
            <Image src={logo} alt="logo" width={70} height={60} />
          </div>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <MapPin size={16} /> Rue du Jura 3, 1023 Crissier, Switzerland
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <Phone size={16} /> +41 21 561 53 15
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <Phone size={16} /> +41 76 566 98 04
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <Mail size={16} /> support@solar-ict.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
