import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-10 mt-16 container mx-auto border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4  text-center">
        <img className="items-center mx-auto mb-4 w-32" src={Logo} alt="" />
        <p className="text-2xl font-bold mb-2">Կապ մեզ հետ</p>
        <div className="flex justify-center gap-6  text-gray-600 text-xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaTiktok />
          </a>
          <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <FaEnvelope />
            <a href="mailto:example@mail.com"></a>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 mt-3 text-gray-600 text-l">
          <a
            href="tel:+37499111222"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <FaPhone />
            +374 99 11 12 22
          </a>
        </div>
        <p className="text-gray-600 mt-6 text-sm">
          © {new Date().getFullYear()} I Mayka — Տպագրություն հագուստի և
          աքսեսուարների վրա
        </p>
      </div>
    </footer>
  );
};

export default Footer;
