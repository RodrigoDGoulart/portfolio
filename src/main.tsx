import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import "./i18n";
import { PortfolioDataContextProvider } from "./contexts/PortfolioDataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PortfolioDataContextProvider>
      <App />
    </PortfolioDataContextProvider>
  </StrictMode>
);
