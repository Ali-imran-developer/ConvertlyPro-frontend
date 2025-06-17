 export const useTextToImage=()=>{
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


    return{
        convertToText
    }
}