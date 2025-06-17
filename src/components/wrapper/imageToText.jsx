import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import link from "../../../public/assets/icons/link.png";
import download from "../../../public/assets/icons/download.png";
import album from "../../../public/assets/icons/album.png";

const Wrapper = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showLinkInput, setShowLinkInput] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setStep(2);
    }
  };

  const preprocessImage = (imageData) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width * 2;
        canvas.height = img.height * 2;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const grayscale =
            data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
          data[i] = grayscale;
          data[i + 1] = grayscale;
          data[i + 2] = grayscale;
        }
        ctx.putImageData(imageData, 0, 0);
        const threshold = 128;
        const binarizedImage = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const binarizedData = binarizedImage.data;
        for (let i = 0; i < binarizedData.length; i += 4) {
          const value = binarizedData[i] > threshold ? 255 : 0;
          binarizedData[i] = value;
          binarizedData[i + 1] = value;
          binarizedData[i + 2] = value;
        }
        ctx.putImageData(binarizedImage, 0, 0);
        resolve(canvas.toDataURL());
      };

      img.onerror = reject;
      img.src = imageData;
    });
  };

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
  }, [imageFile]);

  const convertToText = () => {
    if (!imageUrl) {
      toast.error("Please provide a valid image file!");
      return;
    }

    setLoading(true);

    Tesseract.recognize(imageUrl, "eng", {
      logger: (m) => console.log(m),
      tessedit_char_whitelist:
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.!? ",
    })
      .then(({ data: { text } }) => {
        if (text.trim()) {
          setExtractedText(text.trim());
          toast.success("Text extracted successfully!");
          setStep(3);
        } else {
          toast.error("No text could be extracted. Please try another image.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("OCR Error:", err);
        toast.error("Failed to extract text. Please try again.");
        setLoading(false);
      });
  };

  const clearAll = () => {
    setImageFile(null);
    setImageUrl("");
    setExtractedText("");
    setStep(1);
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
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">
        Image to Text Converter
      </h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
        An online image to text converter to extract text from images.
      </p>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full h-[360px] px-5 py-5 bg-white border-gray-300 rounded-[25px] text-center shadow-lg hover:shadow-xl transition duration-300">
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
                          Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC,
                          PDF
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
          <p className="mt-4 text-base text-start font-semibold text-gray-500">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Wrapper;