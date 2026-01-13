import styles from "./ModalMenu.module.scss";

import ReactDOM from "react-dom";

import HamburguerIcon from "../../../assets/icons/hamburguer.svg?react";

import { LinkType, SocialMediaType } from "../../../@types";
import Button from "../../Button";
import MadeWithLove from "../../MadeWithLove";
import { useState } from "react";
import classNames from "classnames";

interface Props {
  socialMedia: SocialMediaType[];
  pageLinks: LinkType[];
  onClose: () => void;
  onPageClick: (url: string) => void;
  onSocialMediaClick: (url: string) => void;
}

export default function ModalMenu(props: Props) {
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
          {props.pageLinks.map((link) => (
            <li key={link.url}>
              <Button
                styleType="text-only"
                onClick={() => props.onPageClick(link.url)}
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
        <div className={styles.divisor}></div>
        <div className={styles.social_medias}>
          {props.socialMedia.map((socialMedia) => (
            <button
              key={socialMedia.url}
              onClick={() => props.onSocialMediaClick(socialMedia.url)}
            >
              <socialMedia.icon className={styles.social_media__icon} />
              <span>{socialMedia.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.spacing}></div>
        <Button styleType="link">Veja o repositório deste portfólio</Button>
        <MadeWithLove wrapRow />
      </div>
    </div>,
    document.getElementById("portal-root")!
  );
}
