import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Check, Copy, Download, Loader, X } from "lucide-react";
import album from "/assets/icons/album.png";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

const ScannerQR = ({
  loading,
  setLoading,
  copied,
  setImageFile,
  setCopied,
}) => {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [uploadError, setUploadError] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setQrValue("");
    setTimeout(() => {
      setQrValue(text);
      setLoading(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    if (qrValue) {
      navigator.clipboard.writeText(qrValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Text copied to clipboard!");
    } else {
      toast.error("Value does not exist!");
    }
  };

  const handleImageDownload = () => {
    const canvas = document.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  const handleRemoveImage = () => {
    setText("");
    setQrValue("");
    setCopied(false);
    setUploadError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col min-h-[250px] gap-2 transition-all duration-500 ease-in-out sm:flex-row sm:gap-4">
      <div
        className={`transition-all border-4 rounded-2xl border-dashed m-4 duration-500 ease-in-out px-6 py-4 ${
          qrValue ? "w-full sm:w-1/2" : "w-full sm:w-full"
        }`}
      >
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center justify-center mt-4 w-full">
            <img
              src={album}
              alt="Upload"
              className="max-w-32 w-full h-auto object-cover"
            />
          </div>
          <label className="text-lg font-semibold block">
            Drop, Upload or Paste Image
          </label>
          <p className="mb-4 text-sm font-semibold text-gray-500">
            Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF
          </p>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex items-center gap-3 mb-5"
          >
            <Input
              type="text"
              ref={inputRef}
              value={text}
              placeholder="Type anything..."
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChange={(e) => setText(e.target.value)}
              className={`transition-all duration-500 ease-in-out ${
                text || inputFocused ? "w-3/4" : "w-full"
              }`}
            />
            {text && (
              <Button
                onClick={handleGenerate}
                className="w-36"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="h-6 animate-spin" />
                ) : (
                  "Generate Qr Code"
                )}
              </Button>
            )}
          </div>
          {uploadError && (
            <div className="mt-2 text-sm text-red-600">
              Error: {uploadError}
            </div>
          )}
        </div>
      </div>
      {qrValue && (
        <div className="flex flex-col justify-between w-full min-h-full sm:w-1/2 py-4 animate-fade-in me-12 rounded-lg">
          <div className="flex w-full hover:bg-gray-100 justify-between gap-2 border rounded-xl p-4">
            <div className="flex">
              <QRCodeCanvas value={qrValue} size={150} />
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
                onClick={handleImageDownload}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={handleRemoveImage}>
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScannerQR;