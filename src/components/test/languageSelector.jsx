import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import TranslateButton from "../components/TranslateButton";

const HomePage = () => {
  const [image, setImage] = useState(null);
  const [translatedImage, setTranslatedImage] = useState(null);
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: "ur", name: "Urdu" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
  ];

  const handleImageUpload = (file) => {
    setImage(file);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
  };

  const handleTranslate = async () => {
    if (!image || !language) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("language", language);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        body: formData,
      });
      const blob = await response.blob();
      setTranslatedImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <UploadForm
        onImageUpload={handleImageUpload}
        languages={languages}
        onLanguageSelect={handleLanguageSelect}
      />
      <TranslateButton onClick={handleTranslate} isLoading={isLoading} />
      {translatedImage && (
        <div className="mt-4">
          <img src={translatedImage} alt="Translated" />
          <a
            href={translatedImage}
            download="translated-image.png"
            className="btn btn-secondary"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default HomePage;