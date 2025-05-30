import React from "react";
import { footerLinks, socialMedia } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
     className="bg-transparent flex flex-col items-center sm:px-16 px-6 sm:py-10 py-6 w-full mt-10 max-sm:mt-0">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-start text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl md:text-[100px] lg:text-[120px] xl:text-[150px]  text-white font-bold leading-tight">
            QuizGen
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-white max-w-[310px] mx-auto md:mx-0">
            A new way to make quizzes easy, reliable, and motivating.
          </p>
        </div>

        {/* Right Section - Links */}
        <div className="flex-[1.5] w-full flex flex-wrap justify-center md:justify-between ml-0 md:ml-10 mt-10 md:mt-0 gap-6">
          {footerLinks.map((footerLink) => (
            <div key={footerLink.key} className="flex flex-col min-w-[150px] text-center md:text-left">
              <h4 className="text-lg md:text-xl font-semibold text-white">{footerLink.title}</h4>
              <ul className="mt-2 space-y-2">
                {footerLink.links.map((link) => (
                  <li
                    key={link.name}
                    className="relative text-sm md:text-base text-white cursor-pointer transition-all duration-300 
                               after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] 
                               after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
