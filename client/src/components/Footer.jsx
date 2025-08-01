import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const REACT_APP_API_URL = "";
  return (
    <footer className="bg-gray-900 text-white py-6 z-55">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left Side - TypeAnimation */}
        <div className="text-center md:text-left">
          <TypeAnimation
            sequence={['Created by Arbab ❤️', 2000, '', 500]}
            speed={30}
            repeat={Infinity}
            wrapper="span"
            className="text-lg font-semibold"
          />
          <p className="text-sm text-gray-400 mt-1">
            © {new Date().getFullYear()} SmartKhata. All rights reserved.
          </p>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/Arbab-ofc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform duration-300 text-white hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/arbab-arshad-0b2961326/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform duration-300 text-white hover:text-blue-400"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://x.com/Arbab_ofc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform duration-300 text-white hover:text-blue-300"
          >
            <FaXTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
