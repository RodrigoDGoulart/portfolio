import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PortfolioData as PortfolioDataType, SocialMediaType } from "../@types";
import { useTranslation } from "react-i18next";

import WhatsappIcon from "../assets/icons/whatsapp.svg?react";
import EmailIcon from "../assets/icons/email.svg?react";
import GithubIcon from "../assets/icons/github.svg?react";
import LinkedinIcon from "../assets/icons/linkedin.svg?react";

interface PortfolioDataContextType {
  loading: boolean;
  texts: PortfolioDataType;
  socialMedias: SocialMediaType[];
}

const PortfolioDataContext = createContext<PortfolioDataContextType>(
  {} as PortfolioDataContextType,
);

interface PortfolioDataContextProviderProps {
  children: ReactNode;
}

export const PortfolioDataContextProvider = ({
  children,
}: PortfolioDataContextProviderProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? i18n.language;

  const [portfolioData, setPortfolioData] = useState<PortfolioDataType | null>(
    null,
  );
  const [socialMedias, setSocialMedias] = useState<SocialMediaType[]>([]);
  const [loading, setLoading] = useState(true);

  function defineSocialMedias(portData: PortfolioDataType) {
    const arr: SocialMediaType[] = [];

    if (portData.contacts.whatsapp)
      arr.push({
        name: "whatsapp",
        icon: WhatsappIcon,
        url: `https://wa.me/${portData.contacts.whatsapp}`,
        label: portData.contacts.whatsapp_label,
      });
    if (portData.contacts.email)
      arr.push({
        name: "email",
        icon: EmailIcon,
        url: `mailto:${portData.contacts.email}`,
        label: portData.contacts.email,
      });
    if (portData.contacts.github)
      arr.push({
        name: "github",
        icon: GithubIcon,
        url: `https://github.com/${portData.contacts.github}`,
        label: portData.contacts.github,
      });
    if (portData.contacts.linkedin)
      arr.push({
        name: "linkedin",
        icon: LinkedinIcon,
        url: `https://linkedin.com/in/${portData.contacts.linkedin}/?locale=${lang === "pt" ? "pt-BR" : "en-US"}`,
        label: portData.contacts.linkedin,
      });

    setSocialMedias(arr);
  }

  useEffect(() => {
    (async () => {
      const file = (lang ?? "").startsWith("en")
        ? "/portfolioData/infos.en.json"
        : "/portfolioData/infos.pt.json";

      const response = await fetch(file);

      if (!response.ok) {
        throw new Error("Failed to load portfolio data");
      }

      const data: PortfolioDataType = await response.json();

      defineSocialMedias(data);
      setPortfolioData(data);
      setLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <PortfolioDataContext.Provider
      value={{
        texts: portfolioData as PortfolioDataType,
        socialMedias,
        loading,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);
  return ctx;
}
