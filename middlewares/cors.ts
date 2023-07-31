import cors from "cors";

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
const ALLOWED_CORS = [
  "http://localhost:3000",
  "https://localhost:3000",
  "http://127.0.0.1:5173",
  "https://127.0.0.1:5173",
  "https://adletmayerx.github.io/test-kids-web/",
  "https://adletmayerx.github.io/test-kids-web",
  "http://adletmayerx.github.io/test-kids-web/",
  "http://adletmayerx.github.io/test-kids-web",
  "https://adletmayerx.github.io",
  "http://adletmayerx.github.io",
  "http://github.io",
  "https://github.io",
  "github.io",
  "https://pages.github.com",
  "https://pages.github.com/",
  "https://pages.github.com/?(null)",
  "https://main--elaborate-panda-2f84fd.netlify.app/",
  "https://main--elaborate-panda-2f84fd.netlify.app",
  "http://main--elaborate-panda-2f84fd.netlify.app/",
  "http://main--elaborate-panda-2f84fd.netlify.app",
  "http://netlify.app",
  "https://netlify.app",
];

export default cors({
  credentials: true,
  origin(origin, callback) {
    if (!origin || ALLOWED_CORS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
});
