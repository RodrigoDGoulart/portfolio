import styles from "./Card.module.scss";

import { Project as ProjectType } from "../../@types";
import imgFallback from "../../assets/fallback-img.png";
import ArrowDownIcon from "../../assets/icons/arrowdown.svg?react";
import ArrowUpIcon from "../../assets/icons/arrowup.svg?react";

import Title from "../Title";
import Text from "../Text";
import BadgeContainer from "../BadgeContainer";
import ImageSlides from "../ImageSlides";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import LinkButton from "../LinkButton";

interface Props {
  content: ProjectType;
  onExpandClick?: () => void;
  expaned?: boolean;
  id?: string;
  onContract?: () => void;
  onExpand?: () => void;
}

export default function Card({ content, ...props }: Props) {
  const [renderExpanded, setRenderExpanded] = useState<boolean>(
    !!props.expaned,
  );
  const [isFading, setIsFading] = useState(false);

  const [height, setHeight] = useState<number>(0);
  const measureRef = useRef<HTMLDivElement | null>(null);

  const Links = useMemo(() => {
    return (
      <div className={styles.links}>
        {content.links.map((link) => (
          <LinkButton
            styleType="link"
            key={link.url}
            href={link.url}
            target="_blank"
            icon={link.icon}
          >
            {link.label}
          </LinkButton>
        ))}
      </div>
    );
  }, [content.links]);

  const measureHeight = () => {
    const el = measureRef.current;
    if (!el) return;
    setHeight(el.scrollHeight);
  };

  // anima troca (só conteúdo)
  useEffect(() => {
    const next = !!props.expaned;
    if (next === renderExpanded) return;

    setIsFading(true);

    const t = window.setTimeout(() => {
      setRenderExpanded(next);
      requestAnimationFrame(() => {
        measureHeight();
        setIsFading(false);
        props.onContract?.();
      });
    }, 200);

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.expaned, renderExpanded]);

  useLayoutEffect(() => {
    measureHeight();
  }, [
    renderExpanded,
    content.title,
    content.subtitle,
    content.desc,
    content.details,
    content.badges?.length,
  ]);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => measureHeight());
    ro.observe(el);
    return () => ro.disconnect();
  }, [renderExpanded]);

  // chama onExpand no fim da animação
  useEffect(() => {
    if (!props.expaned) return;

    const t = window.setTimeout(() => {
      props.onExpand?.();
    }, 450);

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.expaned]);

  function CompactContent() {
    return (
      <div className={styles.compactGrid}>
        <img
          src={content.image_url || imgFallback}
          alt={content.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = imgFallback;
          }}
          className={styles.thumbnail}
        />

        <div className={styles.content}>
          <div className={styles.titles}>
            <Title className={styles.title}>{content.title}</Title>
            <Title className={styles.subtitle} size="h2">
              {content.subtitle}
            </Title>
          </div>

          <div className={styles.badges}>
            <BadgeContainer badges={content.badges} maxLength={4} />
          </div>

          <Text className={styles.desc}>
            <span dangerouslySetInnerHTML={{ __html: content.desc }} />
          </Text>

          {Links}

          <div className={styles.expandRow}>
            <button
              className={styles.expandBtn}
              onClick={props.onExpandClick}
              type="button"
            >
              <ArrowDownIcon className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  function ExpandedContent() {
    return (
      <div className={styles.expandedStack}>
        <div className={styles.media}>
          <ImageSlides imgs={content.slides} />
        </div>

        <div className={styles.content}>
          <div className={styles.titles}>
            <Title className={styles.title}>{content.title}</Title>
            <Title className={styles.subtitle} size="h2">
              {content.subtitle}
            </Title>
          </div>

          {Links}

          <div className={styles.badges}>
            <BadgeContainer badges={content.badges} />
          </div>

          <Text className={styles.descExpanded}>
            <span dangerouslySetInnerHTML={{ __html: content.desc }} />
          </Text>
          {content.details.split("\n").map((text, key) => (
            <Text className={styles.details} key={key}>
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </Text>
          ))}

          <div className={styles.expandRow}>
            <button
              className={styles.expandBtn}
              onClick={props.onExpandClick}
              type="button"
            >
              <ArrowUpIcon className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell} id={props.id}>
      {/* altura anima aqui */}
      <div className={styles.heightWrap} style={{ height }}>
        {/* opacidade/slide só no conteúdo */}
        <div
          ref={measureRef}
          className={classNames(styles.switcher, isFading && styles.fadeOut)}
        >
          {renderExpanded ? <ExpandedContent /> : <CompactContent />}
        </div>
      </div>
    </div>
  );
}
