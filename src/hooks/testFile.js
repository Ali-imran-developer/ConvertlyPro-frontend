import { useState } from "react";
import Tesseract from "tesseract.js";
import { toast } from "react-toastify";

export const useImageProcessing = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

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
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL());
      };

      img.onerror = reject;
      img.src = imageData;
    });
  };

  const convertToText = (image) => {
    if (!image) {
      toast.error("Please provide a valid image file!");
      return;
    }
    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
      tessedit_char_whitelist:
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.!? ",
    })
      .then(({ data: { text } }) => {
        if (text.trim()) {
          setExtractedText(text.trim());
          toast.success("Text extracted successfully!");
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

  return {
    imageFile,
    setImageFile,
    imageUrl,
    setImageUrl,
    extractedText,
    preprocessImage,
    convertToText,
    loading,
    setLoading,
  };
};
