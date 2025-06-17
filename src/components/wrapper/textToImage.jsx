import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

const TextToImage = () => {
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("medium");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [imageFormat, setImageFormat] = useState("png");

  const textAreaRef = useRef();
  const imageRef = useRef();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDownload = () => {
    html2canvas(imageRef.current).then((canvas) => {
      const imageUrl = canvas.toDataURL(`image/${imageFormat}`);
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `text-image.${imageFormat}`;
      link.click();
    });
  };

  const handleClear = () => {
    setText("");
    setBgColor("#ffffff");
    setTextColor("#000000");
    setFontSize("medium");
    setIsBold(false);
    setIsItalic(false);
    setFontFamily("Arial");
    setImageFormat("png");
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleBoldToggle = () => {
    setIsBold(!isBold);
  };

  const handleItalicToggle = () => {
    setIsItalic(!isItalic);
  };

  const fontStyle = {
    fontSize:
      fontSize === "small"
        ? "12px"
        : fontSize === "medium"
        ? "16px"
        : fontSize === "large"
        ? "20px"
        : "24px",
    fontFamily,
    fontWeight: isBold ? "bold" : "normal",
    fontStyle: isItalic ? "italic" : "normal",
    color: textColor,
    backgroundColor: bgColor,
  };

  return (
    <section className="bg-gray-100 py-5">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
        Convert Text To Image
      </h1>
      <p className="font-medium text-sm sm:text-base lg:text-lg text-gray-700 mt-2 text-center">
        Our text to image converter allows you to create stunning images from
        your text input. Simply enter your text, <br />
        customize your image with different colors, fonts, and sizes, and save
        it in various file formats.
      </p>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full h-auto px-4 py-4 bg-white border-2 border-dashed rounded-[25px] text-center shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex gap-4">
            {/* Left side for controls */}
            <div className="w-full md:w-1/2 p-4 border-2 border-gray-200 rounded-lg">
              <textarea
                className="w-full p-2 border border-gray-300"
                placeholder="Write your text here..."
                value={text}
                rows={9}
                onChange={handleTextChange}
              />

              <div className="flex items-center gap-2 py-2">
                {/* Background color */}
                <div className="flex items-center">
                  <label className="mr-2 font-semibold">Background Color:</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10"
                  />
                </div>

                {/* Text color */}
                <div className="flex items-center">
                  <label className="mr-2 font-semibold">Text Color:</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10"
                  />
                </div>

                {/* Font size dropdown */}
                <div>
                  <label className="mr-2 font-semibold">Font Size:</label>
                  <select
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="p-2 border font-semibold border-gray-300"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center">
                  <label className="mr-2 font-semibold">Font Family:</label>
                  <select
                    value={fontFamily}
                    onChange={handleFontFamilyChange}
                    className="p-2 border border-gray-300 font-semibold"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                </div>
                <button
                  onClick={handleBoldToggle}
                  className="px-4 py-2 font-semibold rounded-md bg-gray-300"
                >
                  Bold
                </button>
                <button
                  onClick={handleItalicToggle}
                  className="px-4 py-2 font-semibold rounded-md bg-gray-300"
                >
                  Italic
                </button>
              </div>
            </div>

            {/* Right side for Image Preview */}
            <div className="w-full md:w-1/2 p-4 border-2 border-gray-200 rounded-lg">
              <div
                ref={imageRef}
                style={fontStyle}
                className="p-8 border border-gray-300 h-60"
              >
                {text || "Your text will appear here."}
              </div>
              {/* Image Format dropdown */}
              <div className="py-4">
                <label className="mr-2 font-semibold">Image Format:</label>
                <select
                  value={imageFormat}
                  onChange={(e) => setImageFormat(e.target.value)}
                  className="p-2 border border-gray-300 font-semibold"
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                </select>
              </div>

              {/* Download Button */}
              <div>
                <button
                  onClick={handleDownload}
                  className="mr-4 p-2 bg-blue-500 text-white rounded-md font-semibold"
                >
                  Download Image
                </button>

                {/* Clear Button */}
                <button
                  onClick={handleClear}
                  className="p-2 bg-red-500 text-white font-semibold rounded-md"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextToImage;
