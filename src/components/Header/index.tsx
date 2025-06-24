import styles from "./Header.module.scss";

import Logo from "../../assets/logo.svg?react";
import WhatsappIcon from "../../assets/icons/whatsapp.svg?react";
import EmailIcon from "../../assets/icons/email.svg?react";
import GithubIcon from "../../assets/icons/github.svg?react";
import LinkedinIcon from "../../assets/icons/linkedin.svg?react";
import { IconType } from "../../@types";
import Button from "../Button";

const SOCIAL_MEDIA: { icon: IconType; url: string }[] = [
  { icon: WhatsappIcon, url: "https://wa.me/5512996626277" },
  { icon: EmailIcon, url: "mailto:rodinizgoulart@gmail.com" },
  { icon: GithubIcon, url: "https://github.com/RodrigoDGoulart" },
  { icon: LinkedinIcon, url: "https://linkedin.com/in/rodrigo-diniz-goulart" },
];

export default function Header() {
  function handlePageClick(page: string) {
    window.location.hash = '';
    window.location.hash = page;
  }

  function handleSocialMediaClick(page: string) {
    window.open(page, "_blank");
  }

  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <nav>
        <ul>
          <li>
            <Button
              styleType="text-only"
              onClick={() => handlePageClick("#home")}
            >
              Início
            </Button>
          </li>
          <li>
            <Button
              styleType="text-only"
              onClick={() => handlePageClick("#about")}
            >
              Sobre mim
            </Button>
          </li>
          <li>
            <Button
              styleType="text-only"
              onClick={() => handlePageClick("#projects")}
            >
              Projetos
            </Button>
          </li>
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
