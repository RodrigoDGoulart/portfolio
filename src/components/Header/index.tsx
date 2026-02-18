import styles from "./Header.module.scss";

import Logo from "../../assets/logo.svg?react";

import HamburguerIcon from "../../assets/icons/hamburguer.svg?react";

import { LinkType } from "../../@types";

import ModalMenu from "./ModalMenu";

import { useState } from "react";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../../contexts/PortfolioDataContext";
import LinkButton from "../LinkButton";

export default function Header() {
  const { t } = useTranslation();
  const { socialMedias: SOCIAL_MEDIA } = usePortfolioData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const LINKS: LinkType[] = [
    { label: t("header.home"), url: "#home" },
    { label: t("header.about_me"), url: "#about" },
    { label: t("header.projects"), url: "#projects" },
  ];

  function handleMenuClose() {
    setIsModalOpen(false);
  }

  return (
    <header className={styles.header}>
      {isModalOpen && (
        <ModalMenu
          pageLinks={LINKS}
          socialMedia={SOCIAL_MEDIA}
          onClose={handleMenuClose}
        />
      )}
      <button
        className={styles.hamb_btn}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <HamburguerIcon className={styles.hamb_btn__icon} />
      </button>
      <a href="#home">
        <Logo className={styles.logo} />
      </a>
      <nav>
        <ul>
          {LINKS.map((link, index) => (
            <li key={index}>
              <LinkButton
                styleType="text-only"
                href={link.url}
              >
                {link.label}
              </LinkButton>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.right_content}>
        <div className={styles.social_media}>
          {SOCIAL_MEDIA.map((socialMedia, index) => (
            <a key={index} href={socialMedia.url} target="_blank">
              <socialMedia.icon
                className={styles.social_media__icon}
              />
            </a>
          ))}
        </div>
        <div className={styles.lang_select_div}>
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
}
