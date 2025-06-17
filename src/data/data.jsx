import { Link } from "react-router-dom";

export const paragraphs = [
  { para: "Extracting text from an image is very easy using our tool." },
  {
    para: "Do not waste your time converting JPGs or PNGs to text manually.Our tool will not take more than a minute to convert an image totext.",
  },
  {
    para: "Our picture to text converter is a free online text extraction tool that converts images into text in no time with 100% accuracy.It uses advanced AI technology to get the text from images with a single click.",
  },
];

export const questionsPara = [
  {
    para: "Get text from Image, WhatsApp status, Instagram stories, Twitter feed, Pinterest, or even from the screenshots (PDF, Word, etc.) of your class notes. If you are unable to recognize the handwritten text of your friend, this tool will do it for you.",
  },
  {
    para: "Most importantly, you can convert image to text online without having a thought about the format of the picture i.e., .JPG, .JPEG, .JPE, .JIF, .PNG, .TIFF, etc.",
  },
  { heading: "How does Image to text converter work?" },
  {
    para2:
      "You don't have to do much to copy text from an image if you don't know how to convert a JPEG or PNG to text. Simply follow these steps.",
  },
  { li: `"Upload your image or drag & drop it."` },
  { li: `"Or enter the URL if you have a link to the image."` },
  { li: `"Hit the Convert button."` },
  { li: `"Copy the text to the clipboard or save it as a document."` },
];

export const cardsDetails = [
  {
    name: "Free to use",
    para: "Capturing text from images is totally free. You don't have to spend a single penny to extract captions from your favorite photos. We don't ask our users to get registered with us. You can grab the text and flee away whenever you want.",
  },
  {
    name: "AI-Based Extraction",
    para: "We have worked really hard to come up with a solution that is really worth it. Our tool is powered with tesseract-ocr - an open-source software developed by Hewlett-Packard, funded and maintained by Google. It performs AI-based extraction of text to provide 100% accuracy.",
  },
  {
    name: "Multiple Languages Support",
    para: "This image to text generator supports multiple languages. It means you can extract text in various languages such as English, Spanish, Russian, Dutch, Italian, Portuguese, Indonesian, German, French, Korean, Danish, Czech, Swedish, Polish, Romanian, Thai, Vietnamese, Turkish, Japanese, Chinese, Georgian, Finnish, and Arabic.",
  },
  {
    name: "Download Text File",
    para: "After you are done capturing text, you can download it as a text file. This file can be used to edit the text as per your needs. Moreover, you can copy the text to the clipboard to paste it into another file.",
  },
  {
    name: "Multiple Image Formats",
    para: "This tool supports dozens of image formats. You don’t need to worry about the extension of the image. It supports the following formats, and we are continuously working to add more of them. •JPG JPEG JPE JFIF JIF JFI BMP PNG TIFF.",
  },
];

export const ourDetails = [
  {
    name: "Newspapers",
    para: "You might need to share a piece of news in WhatsApp groups or on social media from Newspaper. Our image to text extractor lets you extract text from printed newspapers and turn it into digital format with a single click.You can convert photo to text using this free OCR tool in no time.",
  },
  {
    name: "Digitalizing Office Documents",
    para: "To edit an old document, you can convert the printed papers into digitalized versions using this pic to text converter.",
  },
  {
    name: "Class Notes",
    para: "With this online image to text converter, you can store the class notes on your mobile by capturing the handwritten notes.",
  },
  {
    name: "Data Entry",
    para: "Data Entry has become much easier with this tool. You just need to capture the image of manually written data and use this picture to text converter to change it digitally.",
  },
  {
    name: "Contact Details",
    para: "When you see contact details like email, phone number on a banner, you can use the image to text converter online to convert it into digital format.",
  },
  {
    name: "Social Media",
    para: "Get your favorite WhatsApp status, Instagram stories, or other social media images in text form.",
  },
];

export const applications = [
  {
    image:
      "https://www.imagetotext.info/web_assets/frontend/img/icons/ios-app.png",
    title: "IOS App",
    subtitle: "Mobile App",
  },
  {
    image:
      "https://www.imagetotext.info/web_assets/frontend/img/icons/android-app.png",
    title: "Play Store",
    subtitle: "Mobile App",
  },
  {
    image:
      "https://www.imagetotext.info/web_assets/frontend/img/icons/windows-app.png",
    title: "Microsoft Store",
    subtitle: "Desktop App",
  },
  {
    image:
      "https://www.imagetotext.info/web_assets/frontend/img/icons/snap-app.png",
    title: "Snap Store",
    subtitle: "Web App",
  },
  {
    image:
      "https://www.imagetotext.info/web_assets/frontend/img/icons/mac-app.png",
    title: "Apple Store",
    subtitle: "Desktop App",
  },
  {
    image:
      "https://www.imagetotext.info/web_assets/frontend/img/icons/google-app.png",
    title: "Google Workspace",
    subtitle: "Google Extension",
  },
];

export const footerLinks = [
  {
    logo: "assets/logo/logo.png",
    title1: "Image to Text",
    description:
      "We present an online OCR (Optical Character Recognition) service to extract text from images.",
    links: [],
  },
  {
    title: "OTHER TOOLS",
    links: [
      { name: "Jpg To Word", url: "#" },
      { name: "Pdf To Text", url: "#" },
      { name: "Pdf To Word", url: "#" },
      { name: "Text To PDF", url: "#" },
      { name: "Text To Word", url: "#" },
    ],
  },
  {
    title: "QUICK LINKS",
    links: [
      { name: "Blogs", url: "#" },
      { name: "Privacy Policy", url: "#" },
      { name: "Refund Policy", url: "#" },
      { name: "Terms & Conditions", url: "#" },
      { name: "Contact Us", url: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { name: "Premium Plan", url: "#" },
      { name: "API Plan", url: "#" },
      { name: "API Documentation", url: "#" },
    ],
  },
  {
    dropDown: true,
    email: {
      title: "EMAIL",
      links: [
        {
          name: "support@imagetotext.info",
          url: "mailto:support@imagetotext.info",
        },
      ],
    },
  },
];

export const navLinks = [
  { name: "Image Translator", to: "/image-translator" },
  { name: "JPG To Word", to: "/jpg-to-word" },
  { name: "PDF To Word", to: "/pdf-to-word" },
  { name: "PDF To Text", to: "/pdf-to-text" },
];

export const buttonLinks = [
  { name: "Chat", icon: "./assets/icons/message.png", to: "/" },
  { name: "Pricing", icon: "./assets/icons/crown.png", to: "/" },
  { name: "Login", icon: "./assets/icons/login.png", to: "/login" },
];

export const iconsBtn = [
  { name: "close", path: "./assets/icons/close.png" },
  { name: "menu", path: "./assets/icons/menu.png" },
];

export const faqData = [
  {
    question: "What is Imagetotext.info?",
    answer: (
      <>
        Image to text is an online tool that allows users to convert images
        containing textual data into editable text using advanced{" "}
        <Link to="/" className="text-blue-700">
          OCR (Optical Character Recognition) technology
        </Link>
        . It can copy text from all image formats, including (JPG, JPEG, PNG,
        TIFF, GIF), etc.
      </>
    ),
  },
  {
    question: "How can I extract text from an image for free?",
    answer: (
      <>
        To extract the text from an image,{" "}
        <li>
          Go to{" "}
          <Link to="/" className="text-blue-700">
            imagetotext.info
          </Link>{" "}
          (Free).
        </li>
        <li>Upload or drag and drop your image.</li>
        <li>
          Click the <span className="font-semibold">Convert</span> button.
        </li>
        <li>Copy the text or save the text file on your computer.</li>
      </>
    ),
  },
  {
    question: "How can I convert JPG to Text?",
    answer: (
      <>
        You can use a JPG to text converter to convert JPG to Text. With just a
        single click, you can quickly convert images into text with great
        accuracy.
      </>
    ),
  },
  {
    question: "How do I convert scanned handwriting to text?",
    answer: (
      <>
        To convert your scanned handwriting to text, upload your images into our
        Image to text converter tool and press the convert button. You can copy
        your notes in soft format or save as a document.
      </>
    ),
  },
  {
    question: "How to Copy Text from PDF Images?",
    answer: (
      <>
        You can copy text from PDF images by using our image OCR tool. Simply
        upload the PDF images from your device and start the process. If you
        need to convert an entire PDF document, you can use our{" "}
        <Link to="/" className="text-blue-700">
          PDF to text converter
        </Link>
        .
      </>
    ),
  },
  {
    question: "How to scan text from image?",
    answer: (
      <>
        Our text extractor allows you to scan text from an image. Upload your
        image to the tool and click "Submit." Upon the process completion, copy
        the text to your clipboard or download a TXT file.
      </>
    ),
  },
  {
    question: "What are the best ways for text extraction from images?",
    answer: (
      <>
        The best way to extract text from images is by using online OCR
        technology. Our text extractor tool uses this technology to get text
        from images in one click. Here are some other tools/methods you can use
        to extract text: <br />
        <Link to="/" className="text-blue-700">
          Tesseract
        </Link>{" "}
        : An open-source OCR engine developed by Google.
        <br />
        <Link to="/" className="text-blue-700">
          Google Cloud Vision API
        </Link>{" "}
        : A cloud-based solution that provides OCR capabilities for image
        analysis.
        <br />
        <Link to="/" className="text-blue-700">
          Apple's Live Text (for iPhone)
        </Link>{" "}
        : A cloud-based solution that provides OCR capabilities for image
        analysis.
        <br />
        <Link to="/" className="text-blue-700">
          Amazon Textract
        </Link>{" "}
        : An AWS service that extracts text, forms, and tables from scanned
        documents.
        <br />
        <Link to="/" className="text-blue-700">
          Microsoft Azure AI Vision
        </Link>{" "}
        : A cloud-based service offering advanced image processing capabilities.
      </>
    ),
  },
];

export const faqData2 = [
  {
    question: "How to convert JPG to Word document (Docx)?",
    answer: (
      <>
        <p>Follow the below steps to convert jpg to editable Docx.</p>
        <p>Upload, paste, or drop an image into the input field.</p>
        <p>You can also upload an image using a URL.</p>
        <p>Verify the reCAPTCHA.</p>
        <p>
          Click the <span className="font-bold">Convert</span> button.
        </p>
      </>
    ),
  },
  {
    question: "Key Features of Jpeg to Word Converter",
    answer: (
      <>
        <p>
          This Jpg to Word converter online editable offers more than one
          uploading option. The offered options are:
        </p>
        <p>Upload image from your device directly.</p>
        <p>Drag and drop the image.</p>
        <p>You can paste copied Image.</p>
        <p>You can retrieve the image from a URL.</p>
      </>
    ),
  },
  {
    question: "No Registration or Login",
    answer: (
      <>
        No registration or login is required, so you can use this free jpg to
        Word converter without email login or Signup.
      </>
    ),
  },
  {
    question: "Unlimited file conversions",
    answer: (
      <>
        Our Jpeg to Word converter has no daily or monthly file conversion
        limit. It is absolutely free of cost, and you can convert unlimited
        images into Word files.
      </>
    ),
  },
  {
    question: "No Watermark",
    answer: (
      <>
        Another premium feature of this Image to Word converter is
        watermark-free conversion. It will convert jpeg to Word documents
        without any watermark.
      </>
    ),
  },
  {
    question: "How to convert jpg to Word on Windows 10?",
    answer: (
      <>
        Open our jpeg to Docx converter in{" "}
        <Link to="/" className="text-blue-700">
          Google Chrome
        </Link>{" "}
        or any other browser, upload or drag & drop your images, and hit the
        Convert button.
      </>
    ),
  },
  {
    question: "How to convert image to document in phone?",
    answer: (
      <>
        <p>Follow the below steps to turn jpg to Word documents.</p>
        <p>Open JPG to Word OCR converter in your phone browser</p>
        <p>Select an Image from your mobile gallery</p>
        <p>
          Hit the <span className="font-bold">submit</span> button
        </p>
      </>
    ),
  },
  {
    question: "Why convert JPG into a Word document?",
    answer: (
      <>
        Converting JPG into a Word file is useful to make image text easily
        editable, searchable, and shareable.
      </>
    ),
  },
  {
    question: "Can a JPEG be opened in Word?",
    answer: (
      <>
        First, you need to convert the JPEG image into Word with the help of the
        online OCR JPG to Word document converter. Once the image has been
        converted, you can download and open it in a Word file.
      </>
    ),
  },
];

export const faqData3 = [
  {
    question: "How to convert PDF to Text?",
    answer: (
      <>
        To convert PDF to text free online, simply follow the below easy steps:{" "}
        <li>Drag and Drop a file from the system.</li>
        <li>Or, upload or paste the PDF file in the input box.</li>
        <li>Verify the reCAPTCHA..</li>
        <li>
          Click the <span className="font-bold">Convert</span> button.
        </li>
      </>
    ),
  },
  {
    question: "How to copy text from PDF?",
    answer: (
      <>
        Did you ever wonder how to copy simple text from PDF documents?{" "}
        <p>
          We have the best solution for you. Our free PDF to text converter
          allows you to copy text from PDF with a single click.
        </p>
        <p>
          It converts PDF to OCR and allows you to copy the result text in
          real-time.
        </p>
        <p>
          Furthermore, if you are wondering how to convert and copy any text
          from an image, then use our Image to text converter.
        </p>
      </>
    ),
  },
  {
    question: "What is the best PDF to Text converter?",
    answer: (
      <>
        Our online PDF to Text converter is one of the best tools that works on
        advanced OCR technology to help users convert multiple PDF files to
        text.
      </>
    ),
  },
  {
    question: "Can a PDF be converted to text?",
    answer: (
      <>
        Yes, with the help of our PDF to Text converter, a PDF file can
        effortlessly be converted to text.
      </>
    ),
  },
  {
    question: "How can I turn a PDF to text?",
    answer: (
      <>
        To turn your PDF file to text submit or upload it into our PDF file to
        Text Converter online tool and press the{" "}
        <span className="font-bold">“Convert”</span> button to start conversion.
        Our tool will automatically turn your PDF into excitable and shareable
        text.
      </>
    ),
  },
  {
    question: "Is it safe to use a PDF to text converter?",
    answer: (
      <>
        Yes, our PDF to text converter is 100% safe and secure. So, you can use
        our tool with full trust and confidence.
      </>
    ),
  },
];

export const faqData4 = [
  {
    question: "Which PDF to Word converter is best?",
    answer: (
      <>
        TOur online PDF to Word Docx converter is one of the best tools that can
        help you quickly and effortlessly convert PDF files into Word documents.
      </>
    ),
  },
  {
    question: "How to change PDF files to Word free?",
    answer: (
      <>
        To change your PDF file to Word for free, upload it into our PDF to Word
        converter, and click the <span className="font-bold">“Convert”</span>{" "}
        button. Our tool will instantly do the conversion process and provide
        you with a downloadable Word file in the output.
      </>
    ),
  },
  {
    question: "How does a PDF to Word converter work?",
    answer: (
      <>
        The{" "}
        <Link to="/" className="text-blue-700">
          PDF files to Word converter uses advanced OCR technology
        </Link>{" "}
        to analyze the content of a PDF file like; text, formatting, and images,
        and then recreate that content in the Word document.
      </>
    ),
  },
  {
    question: "What is the purpose of PDF to Word Converter?",
    answer: (
      <>
        The purpose of PDF to Word converter is to transform your PDF files into
        editable Microsoft Word docx files. This conversion is important to
        update or repurpose PDF content.
      </>
    ),
  }
];


