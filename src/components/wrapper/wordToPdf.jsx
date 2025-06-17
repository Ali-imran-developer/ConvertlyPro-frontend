import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import mammoth from "mammoth";
import "tailwindcss/tailwind.css";
import download from "../../../public/assets/icons/download.png";
import album from "../../../public/assets/icons/album.png";

const convertToPdf = async (file) => {
  const fileType = file.type;

  if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "application/msword"
  ) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    page.drawText(result.value, {
      x: 50,
      y: height - 50,
      maxWidth: width - 100,
      fontSize: 12,
    });

    return pdfDoc.save();
  }

  if (fileType === "text/plain") {
    const textContent = await file.text();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    page.drawText(textContent, {
      x: 50,
      y: height - 50,
      maxWidth: width - 100,
      fontSize: 12,
    });

    return pdfDoc.save();
  }

  if (fileType === "application/pdf") {
    const arrayBuffer = await file.arrayBuffer();
    return arrayBuffer;
  }

  throw new Error(
    "Unsupported file type. Please upload a .docx, .txt, or .pdf file."
  );
};

const App = () => {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".docx, .doc, .txt, .pdf",
  });

  const handleConvertClick = async () => {
    if (!file) return;
    setIsConverting(true);
    setError(null);

    try {
      const pdfBytes = await convertToPdf(file);
      setPdfFile(pdfBytes);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadClick = () => {
    if (pdfFile) {
      const blob = new Blob([pdfFile], { type: "application/pdf" });
      saveAs(blob, "converted-file.pdf");
    }
  };

  // Clear all states
  const handleClearAll = () => {
    setFile(null);
    setIsConverting(false);
    setPdfFile(null);
    setError(null);
  };

  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">Word to PDF</h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
        An online Word to PDF converter is free and accurately converts DOC
        files to PDF format.
        <br /> Use this tool to convert Word documents to PDF files with one
        click
      </p>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div
          className="w-full h-[360px] px-5 py-5 bg-white border-gray-300 rounded-[25px]
         text-center shadow-lg hover:shadow-xl transition duration-300 border-2 border-dashed"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center">
              <img
                src={album}
                alt="Upload"
                className="w-[20%] h-auto object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">
                Convert Word file into Pdf file.
              </h3>
              <p className="font-semibold text-gray-400">
                Supported: only Docx file.
              </p>
            </div>
            <div
              {...getRootProps()}
              className="flex items-center justify-center px-6 py-2
                  bg-gray-100 hover:bg-gray-200 cursor-pointer border border-gray-300 
                  rounded-md text-gray-600 text-lg font-semibold"
            >
              <input {...getInputProps()} />
              <img src={download} alt="Upload" className="w-5 h-5 mr-2" />
              <span>Browse</span>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex items-center gap-2 py-2">
              <button
                onClick={handleConvertClick}
                disabled={isConverting || !file}
                className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded ${
                  isConverting ? "bg-gray-500" : "hover:bg-blue-600"
                }`}
              >
                {isConverting ? (
                  <span>Converting...</span>
                ) : (
                  <span>Convert</span>
                )}
              </button>

              {pdfFile && (
                <button
                  onClick={handleDownloadClick}
                  className="bg-green-500 text-white py-2 font-semibold px-4 rounded hover:bg-green-600"
                >
                  Download PDF
                </button>
              )}

              <button
                onClick={handleClearAll}
                className="bg-red-500 text-white py-2 px-4 font-semibold rounded hover:bg-red-600"
              >
                Clear All
              </button>
            </div>
            <p className="font-semibold text-gray-600 text-start">
              *Once you Uploaded file, Click convert button & it Automatically
              downloaded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
