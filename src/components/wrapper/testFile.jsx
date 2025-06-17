import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import link from "../../../public/assets/icons/link.png";
import download from "../../../public/assets/icons/download.png";
import album from "../../../public/assets/icons/album.png";
import LayoutWrapper from "../shared/layoutWrapper";
import { useImageProcessing } from "@/hooks/testFile";

const imageToText = () => {
  const {
    imageFile,
    setImageFile,
    imageUrl,
    setImageUrl,
    extractedText,
    preprocessImage,
    convertToText,
    loading,
    setLoading,
  } = useImageProcessing();
  const [step, setStep] = useState(1);
  const [showLinkInput, setShowLinkInput] = useState(false);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preprocessImage(e.target.result)
          .then(setImageUrl)
          .catch((err) => {
            console.error("Image preprocessing failed:", err);
            toast.error("Failed to preprocess image. Please try again.");
          });
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile, preprocessImage, setImageUrl]);

  const clearAll = () => {
    setImageFile(null);
    setImageUrl("");
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    toast.success("Text copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "extracted-text.txt");
    toast.success("File downloaded successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      <LayoutWrapper
        title="Image to Text Converter"
        description="An online image to text converter to extract text from images."
      >
        {(() => {
          switch (step) {
            case 1:
              return (
                <div className="">
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
                        Drop, Upload or Paste Image
                      </h3>
                      <p className="text-base text-gray-400 mt-1 mb-3">
                        Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF
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
                        {/* <button
                            onClick={() => setShowLinkInput((prev) => !prev)}
                            className="flex items-center justify-center px-2 py-3 hover:bg-gray-200 border border-gray-300 rounded-md"
                          >
                            <img src={link} alt="Link" className="w-5 h-5" />
                          </button> */}
                      </div>
                      {showLinkInput && (
                        <div className="flex items-center w-1/6">
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
              );

            case 2:
              return (
                <div className="">
                  <div className="h-[270px] flex flex-row items-center justify-between mt-4 border-dashed border-2 px-4 rounded-md py-4">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="w-32 h-auto border border-gray-300 rounded-md"
                      />
                    )}
                    <div className="flex items-center gap-4 flex-col">
                      <button
                        onClick={convertToText}
                        className="px-4 py-2 bg-foreground text-white rounded-md"
                        disabled={loading}
                      >
                        {loading ? "Converting..." : "Convert"}
                      </button>
                      <button
                        onClick={clearAll}
                        className="px-4 py-2 bg-destructive text-white rounded-md"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              );

            case 3:
              return (
                <div className="">
                  <div className="w-full h-[280px] border-dashed border-2 rounded-md px-4 py-4 flex">
                    <div className="w-1/2">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="Uploaded"
                          className="w-32 h-auto border border-gray-300 rounded-md"
                        />
                      )}
                    </div>
                    <div className="w-1/2">
                      <h2 className="text-xl font-bold">Result :</h2>
                      <p className="text-gray-800 h-40 mt-2 w-3/4 mx-auto overflow-y-scroll">
                        {extractedText}
                      </p>
                      <div className="mt-4 space-x-4">
                        <button
                          onClick={copyToClipboard}
                          className="px-4 py-2 bg-blue-950 text-white rounded-md"
                        >
                          Copy Text
                        </button>
                        <button
                          onClick={downloadText}
                          className="px-4 py-2 bg-muted-foreground text-white rounded-md"
                        >
                          Download as File
                        </button>
                        <button
                          onClick={clearAll}
                          className="px-4 py-2 bg-destructive text-white rounded-md"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );

            default:
              return null;
          }
        })()}
        <ToastContainer />
      </LayoutWrapper>
    </>
  );
};

export default imageToText;
