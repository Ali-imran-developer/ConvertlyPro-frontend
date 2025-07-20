import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader, X } from "lucide-react";
import album from "/assets/icons/album.png";
import download from "/assets/icons/download.png";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const ImageUpload = ({
  loading,
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setExtractedText,
  imageLoadingState,
  setUploadedImageUrl,
  setImageLoadingState,
  handleConvertImageToText,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);
  const [uploadError, setUploadError] = useState(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    setExtractedText("");
    setUploadError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      setUploadError(null);
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        `${BASE_URL}/uploader/upload-image`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        const cloudinaryUrl = response.data.result;
        setUploadedImageUrl(cloudinaryUrl);
        // if (formik) {
        //   formik.setFieldValue("image", cloudinaryUrl);
        // }
      } else {
        console.error("Upload failed:", response?.data?.message);
        setUploadError(response?.data?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(
        error.response?.data?.error || error.message || "Upload failed"
      );
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="flex flex-col min-h-[250px] gap-2 transition-all duration-500 ease-in-out sm:flex-row sm:gap-4">
      <div
        className={`transition-all border-4 rounded-2xl border-dashed m-4 duration-500 ease-in-out px-6 py-4 ${
          uploadedImageUrl ? "w-full sm:w-1/2" : "w-full sm:w-full"
        }`}
      >
        <div className={`w-full ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
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
          <div onDragOver={handleDragOver} onDrop={handleDrop}>
            <Input
              id="image-upload"
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleImageFileChange}
              accept="image/*"
            />
            {/* {imageLoadingState ? (
              <div className="flex flex-col items-center justify-center h-32">
                <Loader className="h-10 animate-spin" />
                <span className="mt-2 text-sm font-medium text-gray-600">Uploading image...</span>
              </div>
            ) : ( */}
            <label
              htmlFor="image-upload"
              className="w-full flex items-center justify-center"
            >
              <div className="w-32 flex items-center justify-center py-2 mb-4 bg-gray-100 hover:bg-gray-200 cursor-pointer border border-gray-300 rounded-md text-gray-600 text-lg font-semibold">
                {imageLoadingState ? (
                  <Loader className="h-6 animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <img src={download} alt="Upload" className="w-6 h-6" />
                    <p>Browse</p>
                  </div>
                )}
              </div>
            </label>
            {/* )} */}
          </div>
          {uploadError && (
            <div className="mt-2 text-sm text-red-600">
              Error: {uploadError}
            </div>
          )}
          {/* {uploadedImageUrl && !uploadError && (
            <div className="mt-2 text-sm text-green-600">
              Image uploaded successfully!
            </div>
          )} */}
        </div>
      </div>
      {uploadedImageUrl && (
        <div className="flex flex-col justify-between w-full min-h-full sm:w-1/2 py-4 animate-fade-in me-12 rounded-lg">
          {/* <div className="flex flex-col justify-between gap-4"> */}
          <div className="flex w-full items-center hover:bg-gray-100 justify-between gap-2 border rounded-xl p-4">
            <div className="flex">
              <img
                src={uploadedImageUrl?.url}
                alt="Uploaded preview"
                className="w-16 h-16 object-cover rounded-lg mr-2"
              />
              <div className="flex flex-col text-sm m-2 font-medium truncate line-clamp-2">
                <p className="text-lg">{imageFile?.name ?? ""}</p>
                <div className="flex items-center gap-1">
                  <p className="text-gray-600">{uploadedImageUrl?.width}</p>
                  <X className="w-4 h-4 text-gray-600" />
                  <p className="text-gray-600">{uploadedImageUrl?.height}</p>
                </div>
              </div>
            </div>
            <Button
              className="bg-transparent text-primary hover:bg-transparent hover:cursor-pointer"
              onClick={handleRemoveImage}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={handleRemoveImage}>
              Clear All
            </Button>
            <Button className="w-28" onClick={handleConvertImageToText}>
              {loading ? <Loader className="h-6 animate-spin" /> : "Convert"}
            </Button>
          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;