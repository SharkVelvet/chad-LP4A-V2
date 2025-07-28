import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initFacebookPixel } from "./lib/facebook-pixel";

// Initialize Facebook Pixel
initFacebookPixel().catch(console.error);

createRoot(document.getElementById("root")!).render(<App />);
