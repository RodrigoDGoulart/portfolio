import styles from "./ModalMenu.module.scss";

import ReactDOM from "react-dom";

import HamburguerIcon from "../../../assets/icons/hamburguer.svg?react";

import { LinkType, SocialMediaType } from "../../../@types";
import MadeWithLove from "../../MadeWithLove";
import { useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../../../contexts/PortfolioDataContext";
import LinkButton from "../../LinkButton";

interface Props {
  socialMedia: SocialMediaType[];
  pageLinks: LinkType[];
  onClose: () => void;
}

export default function ModalMenu(props: Props) {
  const { t } = useTranslation();
  const { texts } = usePortfolioData();

  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      props.onClose();
    }, 200);
  }

  return ReactDOM.createPortal(
    <div
      className={classNames(styles.overlay, { [styles["closing"]]: isClosing })}
      onClick={handleClose}
    >
      <div
        className={classNames(styles.menu, { [styles["closing"]]: isClosing })}
      >
        <HamburguerIcon onClick={handleClose} className={styles.hamb_icon} />
        <ul>
          {props.pageLinks.map((link, index) => (
            <li key={link.url}>
              <LinkButton key={index} styleType="text-only" href={link.url}>
                {link.label}
              </LinkButton>
            </li>
          ))}
        </ul>
        <div className={styles.divisor}></div>
        <div className={styles.social_medias}>
          {props.socialMedia.map((socialMedia) => (
            <a key={socialMedia.url} href={socialMedia.url}>
              <socialMedia.icon className={styles.social_media__icon} />
              <span>{socialMedia.label}</span>
            </a>
          ))}
        </div>
        <div className={styles.spacing}></div>
        <LinkButton
          href={texts.portfolio_repo_url}
          target="_blank"
          styleType="link"
          style={{ textAlign: "center" }}
        >
          {t("footer.see_this_portfolio_repository")}
        </LinkButton>
        <MadeWithLove wrapRow />
        <div className={styles.license_container}>
          <span className={styles.license_txt}>© 2026 Rodrigo Goulart</span>
          <span className={styles.license_txt}>MIT Licensed.</span>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")!,
  );
}
