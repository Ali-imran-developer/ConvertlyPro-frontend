import React, { useState } from "react";
import link from "../../../public/assets/icons/link.png";
import download from "../../../public/assets/icons/download.png";
import album from "../../../public/assets/icons/album.png";

const wraper = ({tool}) => {
  const [showLinkInput, setShowLinkInput] = useState({
    
  });

  const handleClick = () => {
    console.log(tool);
  }
  
  return (
    
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full px-5 py-5 bg-white border-gray-300 rounded-[25px] text-center shadow-lg hover:shadow-xl transition duration-300">
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
                    />
                    <button
                      onClick={() => handleClick()}
                      className="flex items-center justify-center px-2 py-3 hover:bg-gray-200 border border-gray-300 rounded-md"
                    >
                      <img src={link} alt="Link" className="w-5 h-5" />
                    </button>
                  </div>
                  {showLinkInput && (
                    <div className="flex items-center w-1/6">
                      <input
                        type="text"
                        placeholder="Paste image URL here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          <p className="mt-4 text-base text-start font-semibold text-gray-500">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </div>
      </div>
  );
};

export default wraper;