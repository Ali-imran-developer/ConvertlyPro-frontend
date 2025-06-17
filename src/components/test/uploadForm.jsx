import React, { useState } from "react";

const UploadForm = ({ onImageUpload, languages, onLanguageSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) onImageUpload(file);
  };

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    onLanguageSelect(language);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="file-input file-input-bordered"
      />
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="select select-bordered"
      >
        <option value="" disabled>
          Select Language
        </option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UploadForm;