import React, { useState, useRef } from "react";
import download from "../../../public/assets/icons/download.png";
import { Document, Packer, Paragraph, TextRun } from "docx";

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

  const parseHtmlToTextRun = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const children = Array.from(tempDiv.childNodes);

    const textRuns = children.map((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        return new TextRun(child.nodeValue);
      } else {
        return new TextRun(child.textContent);
      }
    });

    return textRuns;
  };

  const convertToWord = () => {
    const content = editorRef.current.innerHTML || fileText;
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: parseHtmlToTextRun(content),
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "converted-file.docx";
      link.click();
    });
  };

  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">Text to Word</h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
        To use this Text to Word converter, Upload a .TXT file or Copy/Paste
        your text in the input box.
        <br /> Next, click the Convert Button to convert the text file into Word
        (DOC, DOCX) with high accuracy.
      </p>
      {/* wrapper */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full h-[360px] px-3 py-5 bg-white border-gray-300 rounded-[25px] border-dashed border-2 text-center shadow-lg hover:shadow-xl transition duration-300">
          <div className="">
            <div className="mb-6 px-6">
              <div className="flex items-center justify-center gap-2 pt-4 mb-6">
                {!fileText && (
                  <div className="flex justify-center items-center">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex items-center justify-center px-4 py-2
                   bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-gray-600 
                    font-semibold"
                    >
                      <img
                        src={download}
                        alt="Upload"
                        className="w-5 h-5 mr-2"
                      />
                      Browse File
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                )}
                <button
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md
                 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={convertToWord}
                >
                  Convert to Word
                </button>
              </div>

              <div
                ref={editorRef}
                contentEditable
                className="w-full h-48 border-2 border-dashed rounded-lg focus:border-none overflow-y-scroll px-2"
                placeholder="Write your text here..."
                dangerouslySetInnerHTML={{ __html: fileText }}
              />
              <p className="mt-4 text-base text-start font-semibold text-gray-500">
                *Your privacy is protected! No data is transmitted or stored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextEditor;
