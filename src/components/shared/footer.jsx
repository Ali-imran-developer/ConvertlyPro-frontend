import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "../shared/dropdown";
import {footerLinks} from "../../data/data";

const Footer = () => {
  return (
    <footer className="bg-[#000027] text-white pt-10 pb-6 px-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20">
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              {section.logo && (
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={section.logo}
                    alt="Logo"
                    className="w-10 h-auto object-cover"
                  />
                  <h3 className="font-semibold text-xl">{section.title1}</h3>
                </div>
              )}
              {section.title && (
                <h3 className="font-semibold text-xl">{section.title}</h3>
              )}
              {section.description && (
                <p className="text-sm text-gray-400">{section.description}</p>
              )}
              {section.links && (
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-sm text-gray-300 hover:text-white"
                      >
                        {link.icon && (
                          <i className={`fab fa-${link.icon} mr-2`}></i>
                        )}
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* Render LanguageDropdown if it exists in section */}
              {section.dropDown && (
                <div className="flex flex-col items-start space-y-4">
                  <Dropdown />
                </div>
              )}

              {/* Render Email section if it exists */}
              {section.email && (
                <div className="flex flex-col space-y-2">
                  <h3 className="font-semibold text-xl">
                    {section.email.title}
                  </h3>
                  <ul>
                    {section.email.links.map((email, emailIndex) => (
                      <li key={emailIndex}>
                        <a
                          href={email.url}
                          className="text-sm text-gray-300 hover:text-white"
                        >
                          {email.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-base border-t border-gray-800 text-gray-300
       mt-8 pt-4 flex flex-col items-center justify-center">
        <p>© All rights reserved | It is made by</p>
        <Link to={"/"} className="font-semibold text-lg">imagetotext.info</Link>
      </div>
    </footer>
  );
};

export default Footer;
