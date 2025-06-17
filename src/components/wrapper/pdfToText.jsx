import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as pdfjs from "pdfjs-dist/build/pdf";
import { NotepadText } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfTextExtractor = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      setFileName(file.name);
      const sizeInKb = (file.size / 1024).toFixed(2);
      setFileSize(
        sizeInKb > 1024
          ? `${(sizeInKb / 1024).toFixed(2)} MB`
          : `${sizeInKb} KB`
      );
      setStep(2);
    }
  };

  const extractTextFromPDF = async () => {
    if (!pdfFile) return;

    try {
      setLoading(true);
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n";
      }

      setPdfText(extractedText);
      setStep(3);
    } catch (error) {
      console.error("Error extracting text: ", error);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setPdfFile(null);
    setFileName("");
    setFileSize("");
    setPdfText("");
    setStep(1);
  };

  const downloadText = () => {
    const blob = new Blob([pdfText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "extracted-text.txt");
  };

  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">
        PDF to Text Converter
      </h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
        An online PDF to text converter to extract text from PDF. Upload your
        PDF and get your Txt file instantly.
      </p>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full h-[360px] px-5 py-5 bg-white border-gray-300 rounded-[25px] text-center shadow-lg hover:shadow-xl transition duration-300">
          {(() => {
            switch (step) {
              case 1:
                return (
                  <div className=" pb-4 border-dashed border-2 rounded-md">
                    <div className="flex items-center justify-center mt-4">
                      <img
                        src="../../public/assets/icons/album.png"
                        alt="Upload"
                        className="w-[10%] h-auto object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-medium">
                        Drop or Upload PDF
                      </h3>
                      <p className="text-base text-gray-400 mt-1 mb-3">
                        Supported format: PDF
                      </p>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <label
                        htmlFor="pdfUpload"
                        className="flex items-center justify-center px-6 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer border border-gray-300 rounded-md text-gray-600 text-lg font-semibold"
                      >
                        <img
                          src="/public/assets/icons/download.png"
                          alt="Upload"
                          class="w-5 h-5 mr-2"
                        />
                        Browse
                      </label>
                      <input
                        type="file"
                        id="pdfUpload"
                        className="hidden"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                );

              case 2:
                return (
                  <div className="h-[270px] pb-4 border-dashed border-2 rounded-md px-4 flex items-center justify-center mt-4">
                    <div className="w-1/2 text-left border-gray-300 gap-4 px-4 py-10 flex border-2 rounded-lg">
                      <NotepadText className="text-blue-600 w-12 h-auto object-cover" />
                      <div className="">
                        <p className="text-lg font-semibold">
                          Name: {fileName}
                        </p>
                        <p className="text-lg font-semibold">
                          Size: {fileSize}
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col items-end px-4">
                      <button
                        onClick={extractTextFromPDF}
                        className="px-3 py-2 font-semibold bg-blue-600 text-white rounded-md"
                        disabled={loading}
                      >
                        {loading ? "Extracting..." : "Extract Text"}
                      </button>
                      <button
                        onClick={clearAll}
                        className="px-6 py-2 bg-red-500 text-white rounded-md mt-2"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                );

              case 3:
                return (
                  <div className="flex border-2 h-[280px] pb-4 border-dashed rounded-md px-4 py-5">
                    <div className="w-1/2">
                      <textarea
                        value={pdfText}
                        readOnly
                        className="w-full h-60 border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="w-1/2 flex items-end flex-col justify-center">
                    <button
                      onClick={downloadText}
                      className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md mt-4"
                    >
                      Download Text
                    </button>
                    <button
                      onClick={clearAll}
                      className="px-10 py-2 bg-red-500 text-white font-semibold rounded-md mt-2"
                    >
                      Clear All
                    </button>
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })()}
          <p class="mt-4 text-base text-start font-semibold text-gray-500">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PdfTextExtractor;