import { useState } from "react";
import ImageUpload from "../shared/image-uploader";
import toast from "react-hot-toast";
import LayoutWrapper from "../shared/layoutWrapper";
import axios from "axios";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigRightDash, Check, Copy, Download } from "lucide-react";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Wrapper = () => {
  const [viewKey, setViewKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const handleConvertImageToText = async () => {
    if (!uploadedImageUrl) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/uploader/get-text`, {
        params: { url: uploadedImageUrl?.url },
      });
      if (res?.data?.success) {
        setExtractedText(res?.data?.text);
      } else {
        toast.error("Failed to extract text");
      }
    } catch (err) {
      console.error("Conversion error:", err);
      toast.error("Something went wrong during OCR conversion");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Text copied to clipboard!");
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "extracted-text.txt");
    toast.success("File downloaded successfully!");
  };

  const handleClear = () => {
    setImageFile(null);
    setExtractedText("");
    setUploadedImageUrl("");
    setTimeout(() => {
      setViewKey((prev) => prev + 1);
    }, 50);
  };

  return (
    <LayoutWrapper
      title="Image to Text Converter"
      description=" An online image to text converter to extract text from images."
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={viewKey + (extractedText ? "-result" : "-upload")}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {extractedText ? (
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
                    <p className="font-semibold">{extractedText}</p>
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
                    onClick={downloadText}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="">
              <ImageUpload
                loading={loading}
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setExtractedText={setExtractedText}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
                handleConvertImageToText={handleConvertImageToText}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </LayoutWrapper>
  );
};

export default Wrapper;