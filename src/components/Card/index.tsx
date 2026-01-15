import styles from "./Card.module.scss";

import { Project as ProjectType } from "../../@types";

import imgFallback from "../../assets/fallback-img.png";
import ArrowDownIcon from "../../assets/icons/arrowdown.svg?react";
import ArrowUpIcon from "../../assets/icons/arrowup.svg?react";

import Button from "../Button";
import Title from "../Title";
import Text from "../Text";
import BadgeContainer from "../BadgeContainer";

import { useEffect, useState } from "react";
import classNames from "classnames";
import ImageSlides from "../ImageSlides";

interface Props {
  content: ProjectType;
  onExpandClick?: () => void;
  expaned?: boolean;
}

export default function Card({ content, ...props }: Props) {
  const [value, setValue] = useState(getValue());

  function handleLinkClick(url: string) {
    window.open(url, "_blank");
  }

  function getValue() {
    const width = window.innerWidth;
    if (width < 690) return 3;
    else if (width < 870) return 4;
    return 5;
  }

  function linksComponent() {
    return (
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
    );
  }

  useEffect(() => {
    window.addEventListener("resize", () => setValue(getValue()));
    return () =>
      window.removeEventListener("resize", () => setValue(getValue()));
  }, []);

  return (
    <div
      className={classNames(styles.card, props.expaned ? styles.expanded : "")}
    >
      {props.expaned ? (
        <ImageSlides imgs={content.slides} />
      ) : (
        <img
          src={content.image_url || imgFallback}
          alt={content.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = imgFallback;
          }}
          className={styles.thumbnail}
        />
      )}
      <div className={styles.content}>
        <div className={styles.titles}>
          <Title className={styles.title}>{content.title}</Title>
          <Title className={styles.subtitle} size="h2">
            {content.subtitle}
          </Title>
        </div>
        {props.expaned && linksComponent()}
        <div className={styles.badges}>
        <BadgeContainer badges={content.badges} maxLength={value} />
        </div>
        <Text className={styles.desc}>{content.desc}</Text>
        {props.expaned && (
          <Text className={styles.desc}>{content.details}</Text>
        )}
        {!props.expaned && linksComponent()}
        <div className={styles.expand_row}>
          <div className={styles.expand_btn} onClick={props.onExpandClick}>
            {props.expaned ? (
              <ArrowUpIcon className={styles.icon} />
            ) : (
              <ArrowDownIcon className={styles.icon} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
