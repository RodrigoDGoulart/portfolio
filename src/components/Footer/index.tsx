import styles from "./Footer.module.scss";

import Logo from "../../assets/logo.svg?react";

import OpenLinkIcon from "../../assets/icons/openlink.svg?react";

import { useTranslation } from "react-i18next";
import MadeWithLove from "../MadeWithLove";
import { usePortfolioData } from "../../contexts/PortfolioDataContext";
import LinkButton from "../LinkButton";

export default function Footer() {
  const { t } = useTranslation();
  const { texts, socialMedias: SOCIAL_MEDIA } = usePortfolioData();

  return (
    <footer className={styles.footer}>
      <Logo className={styles.logo} />
      <div className={styles.social_media_container}>
        {SOCIAL_MEDIA.map((socialMedia, index) => (
          <a key={index} href={socialMedia.url} target="_blank">
            <socialMedia.icon className={styles.social_media__icon} />
          </a>
        ))}
      </div>
      <LinkButton
        styleType="link"
        icon={OpenLinkIcon}
        href={texts.portfolio_repo_url}
        target="_blank"
      >
        {t("footer.see_this_portfolio_repository")}
      </LinkButton>
      <MadeWithLove />
      <div className={styles.license_txt}>
        © 2026 Rodrigo Goulart — MIT Licensed.
      </div>
    </footer>
  );
}
