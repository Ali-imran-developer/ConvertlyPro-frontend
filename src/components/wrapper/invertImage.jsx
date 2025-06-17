import React, { useState, useRef } from "react";
import download from "../../../public/assets/icons/download.png";
import album from "../../../public/assets/icons/album.png";

function App() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleConvertImage = () => {
    if (!image) return;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }

      ctx.putImageData(imageData, 0, 0);
      setImage(canvas.toDataURL());
    };
  };

  const handleDownloadImage = () => {
    if (!image) return;

    const link = document.createElement("a");
    link.href = image;
    link.download = "inverted-image.png";
    link.click();
  };

  const handleClearAll = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
        Invert Image
      </h1>
      <p className="font-medium text-sm sm:text-base lg:text-lg text-gray-700 mt-2 text-center">
        Using invert image, you can reverse the colors of an image for free. To
        use this online photo inverter upload <br/>your image in the input box, and
        click the Convert button.
      </p>
      <div className="container mx-auto px-2 sm:px-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full h-auto px-4 py-4 bg-white border-2 border-dashed rounded-[25px] text-center shadow-lg hover:shadow-xl transition duration-300">
          <div className="flex flex-col md:flex-row pt-2 gap-4">
            {/* Upload Section */}
            <div className="w-full md:w-1/2 pt-6 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center justify-center flex-col">
                <img
                  src={album}
                  alt="Upload"
                  className="w-16 sm:w-20 md:w-[18%] h-auto object-cover"
                />
                <h1 className="text-lg sm:text-xl py-2 font-semibold text-gray-800">
                  Drop, Upload or Paste image
                </h1>
              </div>
              <div className="flex flex-col items-center py-4">
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer border border-gray-300 rounded-md text-gray-600 font-semibold"
                  >
                    <img
                      src={download}
                      alt="Upload"
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    />
                    Browse
                  </label>
                </div>
                <p className="text-sm sm:text-base font-semibold py-4 text-gray-700">
                  Once You uploaded the image, it will show here:
                </p>
              </div>
            </div>

            {/* Preview and Buttons Section */}
            <div className="w-full md:w-1/2 py-4 flex flex-col items-center justify-center pt-6 border-2 border-gray-200 rounded-lg">
              {image && (
                <img
                  src={image}
                  alt="Processed"
                  className="w-4/5 max-w-xs border border-gray-300 rounded-lg"
                />
              )}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-4">
                {image && (
                  <button
                    onClick={handleConvertImage}
                    className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 text-sm sm:text-base"
                  >
                    Convert
                  </button>
                )}
                {image && (
                  <button
                    onClick={handleDownloadImage}
                    className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base"
                  >
                    Download
                  </button>
                )}
                {image && (
                  <button
                    onClick={handleClearAll}
                    className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
