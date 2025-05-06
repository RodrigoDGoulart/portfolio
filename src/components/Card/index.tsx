import styles from "./Card.module.scss";

import { Project as ProjectType } from "../../@types";

import imgFallback from "../../assets/fallback-img.png";

import Button from "../Button";
import Title from "../Title";
import Text from "../Text";
import BadgeContainer from "../BadgeContainer";

import { useEffect, useState } from "react";

interface Props {
  content: ProjectType;
}

export default function Card({ content }: Props) {
  const [value, setValue] = useState(getValue());

  function handleLinkClick(url: string) {
    window.open(url, "_blank");
  }

  function getValue () {
    const width = window.innerWidth;
    if (width < 690) return 3;
    else if (width < 870) return 4;
    return 5;
  }

  useEffect(() => {
    window.addEventListener('resize', () => setValue(getValue()));
    return () => window.removeEventListener('resize', () => setValue(getValue()));
  }, []);

  return (
    <div className={styles.card}>
      <img
        src={content.image_url}
        alt={content.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = imgFallback;
        }}
      />
      <div className={styles.content}>
        <div className={styles.titles}>
          <Title className={styles.title}>{content.title}</Title>
          <Title className={styles.subtitle} size="h2">
            {content.subtitle}
          </Title>
        </div>
        <Text className={styles.desc}>{content.desc}</Text>
        <BadgeContainer badges={content.badges} maxLength={value} />
        <div className={styles.links}>
          {content.links.map((link) => (
            <Button
              styleType="link"
              key={link.url}
              onClick={() => handleLinkClick(link.url)}
              icon={link.icon}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
