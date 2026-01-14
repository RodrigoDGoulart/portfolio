import { SocialMediaType } from "../@types";

import texts from "../assets/texts.json";

import WhatsappIcon from "../assets/icons/whatsapp.svg?react";
import EmailIcon from "../assets/icons/email.svg?react";
import GithubIcon from "../assets/icons/github.svg?react";
import LinkedinIcon from "../assets/icons/linkedin.svg?react";

export const SOCIAL_MEDIA: SocialMediaType[] = [];
if (texts.contacts.whatsapp)
  SOCIAL_MEDIA.push({
    icon: WhatsappIcon,
    url: `https://wa.me/${texts.contacts.whatsapp}`,
    label: texts.contacts.whatsapp_label,
  });
if (texts.contacts.email)
  SOCIAL_MEDIA.push({
    icon: EmailIcon,
    url: `mailto:${texts.contacts.email}`,
    label: texts.contacts.email,
  });
if (texts.contacts.github)
  SOCIAL_MEDIA.push({
    icon: GithubIcon,
    url: `https://github.com/${texts.contacts.github}`,
    label: texts.contacts.github,
  });
if (texts.contacts.linkedin)
  SOCIAL_MEDIA.push({
    icon: LinkedinIcon,
    url: `https://linkedin.com/in/${texts.contacts.linkedin}`,
    label: texts.contacts.linkedin,
  });
