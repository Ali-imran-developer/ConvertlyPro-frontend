import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import download from "/assets/icons/download.png";
import album from "/assets/icons/album.png";
import QrScanner from "qr-scanner";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LayoutWrapper from "../../../../components/shared/layoutWrapper";
import { ScanBarcodeIcon, UploadCloudIcon } from "lucide-react";
import toast from "react-hot-toast";
import UploadQR from "./upload-qr";
import ScannerQR from "./scanner-qr";

const QrCodeGenerator = () => {
  const [viewKey, setViewKey] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const handleDownload = () => {
    if (!inputValue) {
      toast.error("No text to download.");
      return;
    }
    const blob = new Blob([inputValue], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-result.txt";
    document.body.appendChild(link);
    toast.success("QR Generated text download!");
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setInputValue("");
    setImageFile(null);
    setUploadedImageUrl("");
    setTimeout(() => {
      setViewKey((prev) => prev + 1);
    }, 50);
  };

  const scanQrCodeFromImage = async (imageUrl) => {
    try {
      setLoading(true);
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = imageUrl.url || imageUrl;
      image.onload = async () => {
        try {
          const result = await QrScanner.scanImage(image);
          console.log("handleScan", result);
          setInputValue(result);
          toast.success("QR code decoded successfully!");
        } catch (error) {
          console.error("QR Decode Failed:", error);
          toast.error("Invalid QR code image!");
        } finally {
          setLoading(false);
        }
      };
    } catch (err) {
      console.error("QR scan error", err);
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (inputValue) {
      navigator.clipboard.writeText(inputValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Text copied to clipboard!");
    } else {
      toast.error("Value does not exist!");
    }
  };

  return (
    <LayoutWrapper
      title="QR Code Scanner"
      description="Our QR code scanner online allows you to scan any code in seconds."
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={viewKey + (inputValue ? "-result" : "-upload")}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-2">
            <Tabs defaultValue="account" className="m-2">
              <TabsList className="">
                <TabsTrigger
                  value="account"
                  className="flex items-center gap-2 text-base"
                >
                  <UploadCloudIcon className="w-6 h-6" />
                  Upload
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="flex items-center gap-2 text-base"
                >
                  <ScanBarcodeIcon className="w-6 h-6" />
                  Scan QR Code
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <UploadQR
                  copied={copied}
                  loading={loading}
                  inputValue={inputValue}
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  setUploadedImageUrl={setUploadedImageUrl}
                  imageLoadingState={imageLoadingState}
                  setImageLoadingState={setImageLoadingState}
                  handleClear={handleClear}
                  handleDownload={handleDownload}
                  copyToClipboard={copyToClipboard}
                  uploadedImageUrl={uploadedImageUrl}
                  scanQrCodeFromImage={scanQrCodeFromImage}
                />
              </TabsContent>
              <TabsContent value="password">
                <ScannerQR
                  copied={copied}
                  loading={loading}
                  setCopied={setCopied}
                  setLoading={setLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </AnimatePresence>
    </LayoutWrapper>
  );
};

export default QrCodeGenerator;

const qrScanner = () => {
  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">QR Code Scanner</h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center">
        Our QR code scanner online allows you to scan any code in seconds.{" "}
        <br />
        You can upload QR codes or use the webcam to scan and decode them
        directly.
      </p>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div
          className="w-full h-[360px] px-5 py-5 bg-white rounded-[25px]
     text-center shadow-lg hover:shadow-xl transition duration-300 border-2 border-dashed"
        >
          <div className="">
            <ToastContainer />
            <div className="flex flex-col md:flex-row gap-4">
              {/* First coloumn */}
              <div className="w-full md:w-1/2 border-2 border-gray-200 rounded-lg">
                <div className="flex items-center justify-center">
                  <img
                    src={album}
                    alt="Upload"
                    className="w-[20%] h-auto object-cover"
                  />
                </div>
                <div className="text-center mb-2">
                  <h3 className="text-xl font-medium">
                    Drop, Upload or Generate Image
                  </h3>
                </div>
                <input
                  type="text"
                  placeholder="Enter URL or text..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border border-gray-300 rounded-lg py-2 px-2 w-3/5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center justify-center gap-2">
                  <label
                    className="flex items-center justify-center px-2 py-2 w-1/5
              bg-gray-100 hover:bg-gray-200 cursor-pointer border border-gray-300
              rounded-md text-gray-600 text-lg font-semibold"
                  >
                    <img src={download} alt="Upload" className="w-5 h-5 mr-2" />
                    Browse
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleGenerate}
                    className="bg-blue-500 text-white font-semibold text-lg px-4 py-2
              rounded hover:bg-blue-600 transition"
                  >
                    Generate
                  </button>
                  <button
                    onClick={handleClear}
                    className="bg-red-500 text-white
             px-4 py-2 rounded hover:bg-red-600 transition text-lg font-semibold"
                  >
                    Clear All
                  </button>
                </div>
                <p className="text-center py-4 font-semibold">
                  The uploaded & generated image, will show here:
                </p>
              </div>
              {/* Second Coloumn */}
              <div
                className="w-full md:w-1/2 flex flex-col items-center justify-center border-2
           border-gray-200 rounded-lg py-4"
              >
                {qrCode && (
                  <div className="flex justify-center py-2">
                    <QRCodeCanvas value={qrCode} size={150} />
                  </div>
                )}
                <div className="flex items-center py-2 gap-2">
                  {inputValue && (
                    <button
                      onClick={handleCopy}
                      className="bg-purple-500 font-semibold text-lg text-white px-2 w-32 py-2 rounded hover:bg-purple-600 transition"
                    >
                      Copy
                    </button>
                  )}
                  {inputValue && (
                    <button
                      onClick={handleDownload}
                      className={`${
                        isGenerated ? "bg-green-500" : "bg-gray-300"
                      } text-white px-6 font-semibold text-lg py-2 rounded hover:bg-green-600 transition`}
                      disabled={!isGenerated}
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
