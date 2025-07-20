const routes = [
  { path: "/", component: () => import("../view/view/imagetoText") },
  { path: "/jpg-to-word", component: () => import("../view/view/jpgtoWord") },
  { path: "/pdf-to-text", component: () => import("../view/view/pdftoText") },
  { path: "/pdf-to-word", component: () => import("../view/view/pdfToWord") },
  { path: "/image-translator", component: () => import("../view/view/imageTranslator") },
  { path: "/image-to-pdf", component: () => import("../view/view/imageToPdf") },
  { path: "/word-to-pdf", component: () => import("../view/view/wordToPdf") },
  { path: "/text-to-pdf", component: () => import("../view/view/textToPdf") },
  { path: "/text-to-word", component: () => import("../view/view/textToWord") },
  { path: "/invert-image", component: () => import("../view/view/invertImage") },
  { path: "/qr-code-scanner", component: () => import("../view/view/qr-code") },
  { path: "/pdf-to-jpg", component: () => import("../view/view/pdfToJpg") },
  { path: "/text-to-image", component: () => import("../view/view/textToImages") },
  { path: "/login", component: () => import("../view/auth/loginForm") },
  { path: "/register", component: () => import("../view/auth/registerForm") },
  { path: "/profile", component: () => import("../view/profile/profile") },
];

export default routes;