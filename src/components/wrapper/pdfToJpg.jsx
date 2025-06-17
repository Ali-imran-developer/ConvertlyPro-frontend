import React, { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { saveAs } from "file-saver";

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [images, setImages] = useState([]);
  const [format, setFormat] = useState("jpg");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    setImages([]);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const convertPdfToImages = async () => {
    if (!pdfFile) return;
    setLoading(true);
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const typedArray = new Uint8Array(e.target.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const pages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
        const image = canvas.toDataURL(`image/${format}`);
        pages.push(image);
      }

      setImages(pages);
    };

    fileReader.readAsArrayBuffer(pdfFile);
  };

  const handleDownload = () => {
    images.forEach((image, index) => {
      saveAs(image, `page-${index + 1}.${format}`);
    });
  };

  const handleClear = () => {
    setPdfFile(null);
    setImages([]);
    setFormat("jpg");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">
        PDF to JPG Converter
      </h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
        Try our fast online PDF to JPG Converter and instantly convert PDF
        documents into JPG files.
      </p>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div
          className="w-full h-[360px] px-5 py-5 bg-white rounded-[25px]
         text-center shadow-lg hover:shadow-xl transition duration-300 border-2 border-dashed"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="p-8 bg-white  max-w-md w-full transition duration-300 hover:shadow-xl">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-900 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <div className="mt-4">
                <label
                  htmlFor="format"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Format:
                </label>
                <select
                  id="format"
                  value={format}
                  onChange={handleFormatChange}
                  className="block w-full mt-2 border-2 border-gray-400 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-3"
                >
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                </select>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={convertPdfToImages}
                  className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-5 h-5"></div>
                  ) : (
                    "Convert"
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
                >
                  Clear All
                </button>
              </div>

              {images.length > 0 && (
                <div className="mt-6">
                  <button
                    onClick={handleDownload}
                    className="w-full px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                  >
                    Download Images
                  </button>
                </div>
              )}
            </div>

            {images.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {images.map((img, idx) => (
                  <div key={idx} className="flex justify-center">
                    <img
                      src={img}
                      alt={`Page ${idx + 1}`}
                      className="w-full rounded-lg shadow-md border-2 border-dashed border-gray-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
