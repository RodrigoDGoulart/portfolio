import styles from "./Footer.module.scss";

import Logo from "../../assets/logo.svg?react";

import OpenLinkIcon from "../../assets/icons/openlink.svg?react";

import { useTranslation } from "react-i18next";
import { getSocialMediaArray } from "../../constants/socialMedia.constants";
import MadeWithLove from "../MadeWithLove";
import Button from "../Button";
import { getPortfolioData } from "../../constants/portfolioData.constants";

export default function Footer() {
  const { t } = useTranslation();

  const texts = getPortfolioData();

  const SOCIAL_MEDIA = getSocialMediaArray();

  function handleClick(url: string) {
    window.open(url, "_blank");
  }

  return (
    <footer className={styles.footer}>
      <Logo className={styles.logo} />
      <div className={styles.social_media_container}>
        {SOCIAL_MEDIA.map((socialMedia, index) => (
          <button key={index}>
            <socialMedia.icon
              className={styles.social_media__icon}
              onClick={() => handleClick(socialMedia.url)}
            />
          </button>
        ))}
      </div>
      <MadeWithLove />
      <Button
        styleType="link"
        icon={OpenLinkIcon}
        onClick={() => handleClick(texts.portfolio_repo_url)}
      >
        {t("footer.see_this_portfolio_repository")}
      </Button>
    </footer>
  );
}
