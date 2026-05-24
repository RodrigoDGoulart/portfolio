import { useEffect, useState } from "react";
import { usePortfolioData } from "../../contexts/PortfolioDataContext";
import {
  buildPortfolioStructuredData,
  SeoConfig,
} from "../../utils/structuredData";

const SCRIPT_ID = "portfolio-json-ld";
const SEO_CONFIG_PATH = "/portfolioData/seo.config.json";

function escapeJsonForScript(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function StructuredData() {
  const { loading, texts, language } = usePortfolioData();
  const [seoConfig, setSeoConfig] = useState<SeoConfig>({});

  useEffect(() => {
    let active = true;

    fetch(SEO_CONFIG_PATH)
      .then((response) => (response.ok ? response.json() : {}))
      .then((config: SeoConfig) => {
        if (active) setSeoConfig(config);
      })
      .catch(() => {
        if (active) setSeoConfig({});
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (loading || !texts) return;

    const structuredData = buildPortfolioStructuredData(
      texts,
      seoConfig,
      language,
    );

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = escapeJsonForScript(structuredData);

    return () => {
      script?.remove();
    };
  }, [language, loading, seoConfig, texts]);

  return null;
}
