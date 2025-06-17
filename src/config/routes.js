const routes = [
  { path: "/", component: () => import("../view/pages/imagetoText") },
  { path: "/jpg-to-word", component: () => import("../view/pages/jpgtoWord") },
  { path: "/pdf-to-text", component: () => import("../view/pages/pdftoText") },
  { path: "/pdf-to-word", component: () => import("../view/pages/pdfToWord") },
  { path: "/image-translator", component: () => import("../view/pages/imageTranslator") },
  { path: "/image-to-pdf", component: () => import("../view/pages/imageToPdf") },
  { path: "/word-to-pdf", component: () => import("../view/pages/wordToPdf") },
  { path: "/text-to-pdf", component: () => import("../view/pages/textToPdf") },
  { path: "/text-to-word", component: () => import("../view/pages/textToWord") },
  { path: "/invert-image", component: () => import("../view/pages/invertImage") },
  { path: "/qr-code-scanner", component: () => import("../view/pages/qrCodeScanner") },
  { path: "/pdf-to-jpg", component: () => import("../view/pages/pdfToJpg") },
  { path: "/text-to-image", component: () => import("../view/pages/textToImages") },
  { path: "/login", component: () => import("../view/auth/loginForm") },
  { path: "/register", component: () => import("../view/auth/registerForm") },
  { path: "/profile", component: () => import("../view/profile/profile") },
];

export default routes;