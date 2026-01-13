import styles from "./Header.module.scss";

import Logo from "../../assets/logo.svg?react";
import WhatsappIcon from "../../assets/icons/whatsapp.svg?react";
import EmailIcon from "../../assets/icons/email.svg?react";
import GithubIcon from "../../assets/icons/github.svg?react";
import LinkedinIcon from "../../assets/icons/linkedin.svg?react";
import HamburguerIcon from "../../assets/icons/hamburguer.svg?react";

import { LinkType, SocialMediaType } from "../../@types";

import Button from "../Button";
import ModalMenu from "./ModalMenu";

import { useState } from "react";

import texts from "../../assets/texts.json";

const SOCIAL_MEDIA: SocialMediaType[] = [];
if (texts.contacts.whatsapp)
  SOCIAL_MEDIA.push({
    icon: WhatsappIcon,
    url: `https://wa.me/${texts.contacts.whatsapp}`,
  });
if (texts.contacts.email)
  SOCIAL_MEDIA.push({ icon: EmailIcon, url: `mailto:${texts.contacts.email}` });
if (texts.contacts.github)
  SOCIAL_MEDIA.push({
    icon: GithubIcon,
    url: `https://github.com/${texts.contacts.github}`,
  });
if (texts.contacts.linkedin)
  SOCIAL_MEDIA.push({
    icon: LinkedinIcon,
    url: `https://linkedin.com/in/${texts.contacts.linkedin}`,
  });

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
