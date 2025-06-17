import React, { useState } from "react";
import download from "../../../public/assets/icons/download.png";
import { jsPDF } from "jspdf";
import album from "../../../public/assets/icons/album.png";

const ImageToPdf = () => {
  const [image, setImage] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setPdfBlob(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToPdf = () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setIsConverting(true);

    setTimeout(() => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(image, "JPEG", 10, 10, 190, 0);
      const pdfBlob = pdf.output("blob");
      setPdfBlob(pdfBlob);
      setIsConverting(false);
    }, 1000);
  };

  const downloadPdf = () => {
    if (pdfBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "image.pdf";
      link.click();
    }
  };

  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
        Image to PDF Converter
      </h1>
      <p className="font-medium text-sm sm:text-base lg:text-lg text-gray-700 mt-2 text-center">
        Image to PDF Converter helps you convert Image to PDF instantly. Upload
        your photo and get the PDF file instantly.
      </p>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div
          className="w-full p-4 h-[360px] border-dashed border-2 px-5 py-5 bg-white border-gray-300
         rounded-[25px] text-center shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-4"
        >
          {/* Input Section */}

          <div className="w-full min-h-full md:w-1/2 flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg">
            <div className="flex items-center justify-center mt-4">
              <img
                src={album}
                alt="Upload"
                className="w-[20%] h-auto object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium">
                Upload or Paste Image
              </h3>
              <p className="text-base text-gray-400 mt-1 mb-3">
                Supported formats: JPG, PNG
              </p>
            </div>
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center px-6 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer border border-gray-300 rounded-md text-gray-600 text-lg font-semibold"
            >
              <img
                src={download}
                alt="Upload"
                className="w-6 h-auto object-cover"
              />
              Browse
            </label>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="py-4 font-semibold">
            Once You uploaded the image, it will show here:
            </p>
          </div>

          <div className="w-full min-h-full md:w-1/2 p-4 border-2 border-gray-200 rounded-lg">
            {/* Uploaded Image and Buttons */}
            {image && (
              <div className="flex flex-col items-center">
                <img
                  src={image}
                  alt="Preview"
                  className="w-1/3 h-40 object-contain mb-4"
                />

                <div className="flex flex-col gap-4">
                  {/* Convert Button */}
                  <button
                    onClick={convertToPdf}
                    disabled={isConverting}
                    className={`px-12 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition ${
                      isConverting ? "cursor-not-allowed bg-blue-300" : ""
                    }`}
                  >
                    {isConverting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        Converting...
                      </div>
                    ) : (
                      "Convert"
                    )}
                  </button>

                  {/* Download Button */}
                  {pdfBlob && (
                    <button
                      onClick={downloadPdf}
                      className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                    >
                      Download PDF
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageToPdf;
