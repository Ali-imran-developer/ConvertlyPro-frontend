import QRUpload from "./qr-uploader";
import { Button } from "@/components/ui/button";
import { ArrowBigRightDash, Check, Copy, Download } from "lucide-react";
import React from "react";

const UploadQR = ({
  copied,
  loading,
  inputValue,
  handleClear,
  uploadedImageUrl,
  copyToClipboard,
  handleDownload,
  imageFile,
  setImageFile,
  setUploadedImageUrl,
  scanQrCodeFromImage,
  imageLoadingState,
  setImageLoadingState,
}) => {
  
  return (
    <div>
      {inputValue ? (
        <>
          <div className="w-full flex items-center justify-between p-4">
            <span className="text-xl font-semibold">Result (1)</span>
            <Button onClick={handleClear}>
              <ArrowBigRightDash className="w-6 h-6" />
              Start Over
            </Button>
          </div>
          <div className="flex justify-between m-4 border border-gray-300 bg-white rounded-lg shadow">
            <div className="flex gap-3 mt-2 p-4">
              <img
                src={uploadedImageUrl?.url}
                alt="Preview Image"
                className="w-32 h-32 object-cover rounded-lg border border-gray-400"
              />
              <div className="w-full min-h-[210px] overflow-y-auto">
                <p className="font-semibold">{inputValue}</p>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {copied ? (
                <Check className="w-6 h-6 text-green-600 transition-opacity duration-300" />
              ) : (
                <Copy
                  className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={copyToClipboard}
                />
              )}
              <Download
                className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={handleDownload}
              />
            </div>
          </div>
        </>
      ) : (
        <QRUpload
          loading={loading}
          handleScan={() => scanQrCodeFromImage(uploadedImageUrl)}
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          imageLoadingState={imageLoadingState}
          setImageLoadingState={setImageLoadingState}
        />
      )}
    </div>
  );
};

export default UploadQR;
