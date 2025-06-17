import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

const buttons = [
  { label: "Bold", action: "bold" },
  { label: "Italic", action: "italic" },
  { label: "Underline", action: "underline" },
  { label: "Align Left", action: "justifyleft" },
  { label: "Align Right", action: "justifyright" },
  { label: "Align Center", action: "justifycenter" },
  { label: "Justify", action: "justifyfull" },
];

const selectDropdowns = [
  { label: "Default", value: "2" },
  { label: "Large", value: "3" },
  { label: "X-Large", value: "4" },
];

const TextEditor = () => {
  const [fileText, setFileText] = useState("");
  const editorRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileText(event.target.result);
    };
    reader.readAsText(file);
  };

  const convertToPDF = () => {
    const element = document.createElement("div");
    const content = editorRef.current.innerHTML || fileText;
    element.innerHTML = content;
    element.style.minHeight = "800px";
    element.style.padding = "20px";
    element.style.lineHeight = "1.5";
    element.style.overflow = "auto";
    element.style.whiteSpace = "pre-wrap";

    const style = document.createElement("style");
    style.innerHTML = `
      * {
        page-break-inside: avoid;
      }
      div, p {
        page-break-inside: avoid;
      }
    `;
    document.head.appendChild(style);

    const options = {
      filename: "converted-file.pdf",
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      html2canvas: { scale: 2, useCORS: true },
      margin: [20, 10, 20, 10],
    };

    html2pdf().set(options).from(element).save();
  };

  const applyStyle = (style) => {
    document.execCommand(style);
  };

  const handleFontSizeChange = (size) => {
    document.execCommand("fontSize", false, size);
  };

  return (
    <div className="py-5 px-4 bg-gray-100">
      <h1 className="text-center text-4xl font-bold mt-2">
        Text to PDF Converter
      </h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
        This online Text to PDF converter free and accurately converts txt files
        to PDF formats. To use this tool, copy-paste text or <br /> select a
        .txt file to upload. Next, click on the convert button to convert the
        text file with high accuracy.
      </p>
      {/* wrapper */}
      <div className="container mx-auto px-4 mt-4">
        <div className="px-5 py-5 bg-white rounded-[25px] border-2 border-dashed text-center shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex items-center justify-center gap-2 py-2">
            {buttons.map(({ label, action }) => (
              <button
                key={action}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 font-semibold border border-gray-400"
                onClick={() => applyStyle(action)}
              >
                {label}
              </button>
            ))}

            <select
              className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 font-semibold border border-gray-400"
              onChange={(e) => handleFontSizeChange(e.target.value)}
            >
              {selectDropdowns.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center gap-2 py-4">
            {!fileText && (
              <label className="flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div
                  className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 
                cursor-pointer border border-gray-300 rounded-md text-gray-600 text-base font-semibold"
                >
                  <img
                    src="/public/assets/icons/download.png"
                    alt="Upload"
                    class="w-5 h-5 mr-2"
                  />
                  <span>Browse</span>
                </div>
              </label>
            )}
            <button
              className="px-4 py-2 bg-blue-500 font-semibold text-base text-white rounded"
              onClick={convertToPDF}
            >
              Convert to PDF
            </button>
          </div>
          <div>
            <div
              ref={editorRef}
              contentEditable
              className="w-full h-40 border-dashed border-2 rounded-lg focus:border-none p-4 overflow-y-scroll"
              placeholder="Write your text here..."
              dangerouslySetInnerHTML={{ __html: fileText }}
            />
          </div>
          <p class="mt-4 text-base text-start font-semibold text-gray-500">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
