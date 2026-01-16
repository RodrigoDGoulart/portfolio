import { LanguageType, SocialMediaType } from "../@types";

import textsPt from "../assets/portfolioData/infos.pt.json";
import textsEn from "../assets/portfolioData/infos.en.json";

import WhatsappIcon from "../assets/icons/whatsapp.svg?react";
import EmailIcon from "../assets/icons/email.svg?react";
import GithubIcon from "../assets/icons/github.svg?react";
import LinkedinIcon from "../assets/icons/linkedin.svg?react";
import i18next from "i18next";

function getSocialMediaArrayByLanguage(lang: LanguageType) {
  const arr: SocialMediaType[] = [];

  const socialMediaData = lang === "pt" ? textsPt : textsEn;

  if (socialMediaData.contacts.whatsapp)
    arr.push({
      icon: WhatsappIcon,
      url: `https://wa.me/${socialMediaData.contacts.whatsapp}`,
      label: socialMediaData.contacts.whatsapp_label,
    });
  if (socialMediaData.contacts.email)
    arr.push({
      icon: EmailIcon,
      url: `mailto:${socialMediaData.contacts.email}`,
      label: socialMediaData.contacts.email,
    });
  if (socialMediaData.contacts.github)
    arr.push({
      icon: GithubIcon,
      url: `https://github.com/${socialMediaData.contacts.github}`,
      label: socialMediaData.contacts.github,
    });
  if (socialMediaData.contacts.linkedin)
    arr.push({
      icon: LinkedinIcon,
      url: `https://linkedin.com/in/${socialMediaData.contacts.linkedin}`,
      label: socialMediaData.contacts.linkedin,
    });

  return arr;
}

export function getSocialMediaArray() {
  const lang = i18next.language;
  return getSocialMediaArrayByLanguage(lang as LanguageType);
}
