import infosPt from "../assets/portfolioData/infos.pt.json";
import infosEn from "../assets/portfolioData/infos.en.json";
import i18next from "i18next";

export function getPortfolioData() {
  const lang = i18next.language;

  switch (lang) {
    case "pt":
      return infosPt;
    case "en":
      return infosEn;
    default:
      return infosPt;
  }
}
