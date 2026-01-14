import styles from "./Header.module.scss";

import Logo from "../../assets/logo.svg?react";
import { SOCIAL_MEDIA } from "../../constants/socialMedia.constants";

import HamburguerIcon from "../../assets/icons/hamburguer.svg?react";

import { LinkType } from "../../@types";

import Button from "../Button";
import ModalMenu from "./ModalMenu";

import { useState } from "react";

const LINKS: LinkType[] = [
  { label: "Início", url: "#home" },
  { label: "Sobre mim", url: "#about" },
  { label: "Projetos", url: "#projects" },
];

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handlePageClick(page: string) {
    window.location.hash = "";
    window.location.hash = page;
  }

  function handleSocialMediaClick(page: string) {
    window.open(page, "_blank");
  }

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
          onPageClick={handlePageClick}
          onSocialMediaClick={handleSocialMediaClick}
        />
      )}
      <button
        className={styles.hamb_btn}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <HamburguerIcon className={styles.hamb_btn__icon} />
      </button>
      <Logo className={styles.logo} />
      <nav>
        <ul>
          {LINKS.map((link) => (
            <li>
              <Button
                styleType="text-only"
                onClick={() => handlePageClick(link.url)}
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.social_media}>
        {SOCIAL_MEDIA.map((socialMedia, index) => (
          <button key={index}>
            <socialMedia.icon
              className={styles.social_media__icon}
              onClick={() => handleSocialMediaClick(socialMedia.url)}
            />
          </button>
        ))}
      </div>
    </header>
  );
}
