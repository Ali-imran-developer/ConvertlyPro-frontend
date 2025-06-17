import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { NotepadText } from "lucide-react";

const PdfToWordConverter = () => {
  const [pdfText, setPdfText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const sanitizeText = (text) => {
    return text.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfText("");
      setFileName(file.name);
      const sizeInKb = (file.size / 1024).toFixed(2);
      setFileSize(
        sizeInKb > 1024
          ? `${(sizeInKb / 1024).toFixed(2)} MB`
          : `${sizeInKb} KB`
      );
      setStep(2);
      setLoading(false);
      const pdfData = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        text += textContent.items.map((item) => item.str).join(" ") + "\n";
      }
      setPdfText(sanitizeText(text));
    }
  };

  const convertToWord = async () => {
    if (pdfText) {
      setLoading(true);
      setTimeout(() => {
        setStep(3);
        setLoading(false);
      }, 1500);
    } else {
      alert("Please upload a valid PDF file first!");
    }
  };

  const downloadWordFile = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: pdfText,
                  font: "Arial",
                  size: 24,
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "converted-file.docx");
    });
  };

  const clearAll = () => {
    setPdfText("");
    setFileName("");
    setFileSize("");
    setStep(1);
  };

  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">
        PDF to Word Converter
      </h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
      Convert your PDF files into Word documents with our PDF to Word converter for free.<br></br> All you need is to upload files, and click a single button, to get your files converted.
      </p>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full h-[360px] px-5 py-5 bg-white border-gray-300 rounded-[25px] text-center shadow-lg hover:shadow-xl transition duration-300">
          {(() => {
            switch (step) {
              case 1:
                return (
                  <div className="pb-4 border-dashed border-2 rounded-md">
                    <div className="flex items-center justify-center mt-4">
                      <img
                        src="/public/assets/icons/album.png"
                        alt="Upload"
                        class="w-[10%] h-auto object-cover"
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
                        <img src="/public/assets/icons/download.png" alt="Upload" class="w-5 h-5 mr-2"/>
                        Browse
                      </label>
                      <input
                        type="file"
                        id="pdfUpload"
                        className="hidden"
                        accept="application/pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                );

              case 2:
                return (
                  <div className="h-[270px] pb-4 border-dashed border-2 rounded-md px-4 flex items-center justify-center mt-4">
                    <div className="w-1/2 text-left border-gray-300 gap-4 px-4 py-10 flex border-2 rounded-lg">
                      <NotepadText className="text-blue-600 w-12 h-auto" />
                      <div>
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
                        onClick={convertToWord}
                        className="w-1/3 py-2 font-semibold bg-blue-600 text-white rounded-md"
                        disabled={loading}
                      >
                        {loading ? "Converting..." : "Convert to Word"}
                      </button>
                      <button
                        onClick={clearAll}
                        className="w-1/3 font-semibold py-2 bg-red-500 text-white rounded-md mt-2"
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
                        onClick={downloadWordFile}
                        className="w-1/3 py-2 bg-blue-600 text-white font-semibold rounded-md mt-4"
                      >
                        Download Word File
                      </button>
                      <button
                        onClick={clearAll}
                        className="w-1/3 py-2 bg-red-500 text-white font-semibold rounded-md mt-2"
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
          <p className="mt-4 text-base text-start font-semibold text-gray-500">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PdfToWordConverter;
