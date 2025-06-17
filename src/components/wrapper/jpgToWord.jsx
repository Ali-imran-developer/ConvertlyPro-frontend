import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, ImageRun } from "docx";
import { saveAs } from "file-saver";
import link from "../../../public/assets/icons/link.png";
import download from "../../../public/assets/icons/download.png";
import album from "../../../public/assets/icons/album.png";

const Home = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [step, setStep] = useState(1);
  const [showLinkInput, setShowLinkInput] = useState(false);

  const clearAll = () => {
    setImageFile(null);
    setImageUrl("");
    setStep(1);
    setShowLinkInput(false);
  };

  const convertToPDF = () => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const pdf = new jsPDF();
      pdf.addImage(reader.result, "JPEG", 10, 10, 180, 160);
      pdf.save("converted-document.pdf");
      toast.success("Image converted to PDF and downloaded!");
    };
    reader.readAsDataURL(imageFile);
  };

  const convertToDOCX = () => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageData.split(",")[1],
                    transformation: {
                      width: 400,
                      height: 300,
                    },
                  }),
                ],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "converted-document.docx");
        toast.success("Image converted to DOCX and downloaded!");
      });
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <>
      <section className="bg-gray-100 py-5 px-4">
        <h1 className="text-center text-4xl font-bold mt-2">Image To Word</h1>
        <p className="font-medium text-lg text-gray-700 mt-2 text-center px-4">
          An online image to Word converter allows you to convert images into
          Word (Docx) documents for free.
          <br /> Use this tool to convert your image files to editable Word
          files.
        </p>

        <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
          <div className="w-full px-5 py-5 bg-white border-gray-300 rounded-[25px] text-center shadow-lg hover:shadow-xl transition duration-300">
            {step === 1 && (
              <div className="w-full">
                <div className="border-dashed border-2 rounded-md">
                  <div className="flex items-center justify-center mt-4">
                    <img
                      src={album}
                      alt="Upload"
                      className="w-[10%] h-auto object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-medium">
                      Drop or Upload Image
                    </h3>
                    <p className="text-base text-gray-400 mt-1 mb-3">
                      Supported formats: JPG, PNG, GIF
                    </p>
                  </div>
                  <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center justify-center space-x-4 mb-4 w-full max-w-sm">
                      <label
                        htmlFor="imageUpload"
                        className="flex items-center justify-center px-6 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer border border-gray-300 rounded-md text-gray-600 text-lg font-semibold"
                      >
                        <img
                          src={download}
                          alt="Upload"
                          className="w-5 h-5 mr-2"
                        />
                        Browse
                      </label>
                      <input
                        type="file"
                        id="imageUpload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files.length) {
                            setImageFile(e.target.files[0]);
                            setStep(2);
                          }
                        }}
                      />
                      <button
                        onClick={() => setShowLinkInput((prev) => !prev)}
                        className="flex items-center justify-center px-2 py-3 hover:bg-gray-200 border border-gray-300 rounded-md"
                      >
                        <img src={link} alt="Link" className="w-5 h-5" />
                      </button>
                    </div>
                    {showLinkInput && (
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="Paste image URL here"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setStep(2);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="w-full">
                <div className="flex flex-row items-center justify-between mt-4 border-dashed border-2 px-4 rounded-md py-4">
                  {imageFile && (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Uploaded"
                      className="w-1/4 h-auto border border-gray-300 rounded-md"
                    />
                  )}
                  <div className="flex items-center gap-4 flex-col">
                    <button
                      onClick={() => setStep(3)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      Proceed to Convert
                    </button>
                    <button
                      onClick={clearAll}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="w-full">
                <div className="flex flex-row items-center justify-between mt-4 border-dashed border-2 px-4 rounded-md py-4">
                  {imageFile && (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Uploaded"
                      className="w-1/4 h-auto border border-gray-300 rounded-md"
                    />
                  )}
                  <div className="flex items-center gap-4 flex-col">
                    <button
                      onClick={convertToPDF}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Convert to PDF
                    </button>
                    <button
                      onClick={convertToDOCX}
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      Convert to DOCX
                    </button>
                    <button
                      onClick={clearAll}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            )}
            <p className="mt-4 text-base text-start font-semibold text-gray-500">
              *Your privacy is protected! No data is transmitted or stored.
            </p>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Home;
