import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");

  const languages = ["English", "Spanish", "French", "German", "Italian"];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-50 px-4 py-2 rounded-lg shadow-md flex justify-between items-center text-gray-700 hover:bg-gray-100"
      >
        <span>{selectedLanguage}</span>
        <ChevronDown className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : "" }`}/>
      </button>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageSelect(language)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
            >
              {language}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;