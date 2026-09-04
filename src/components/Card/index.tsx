import styles from "./Card.module.scss";

import { Project as ProjectType } from "../../@types";
import imgFallback from "../../assets/fallback-img.png";
import ArrowDownIcon from "../../assets/icons/arrowdown.svg?react";
import ArrowUpIcon from "../../assets/icons/arrowup.svg?react";

import Title from "../Title";
import Text from "../Text";
import BadgeContainer from "../BadgeContainer";
import ImageSlides from "../ImageSlides";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const [height, setHeight] = useState<number>(0);
  const compactMeasureRef = useRef<HTMLDivElement | null>(null);
  const expandedMeasureRef = useRef<HTMLDivElement | null>(null);
  const isExpanded = !!props.expaned;
  const previousExpandedRef = useRef(isExpanded);

  const validLinks = useMemo(
    () => content.links.filter((link) => Boolean(link.url)),
    [content.links],
  );

  const Links = useMemo(() => {
    if (!validLinks.length) return null;

    return (
      <div className={styles.links}>
        {validLinks.map((link) => (
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
  }, [validLinks]);

  const measureHeight = useCallback(() => {
    const el = isExpanded
      ? expandedMeasureRef.current
      : compactMeasureRef.current;

    if (!el) return;
    setHeight(el.scrollHeight);
  }, [isExpanded]);

  useLayoutEffect(() => {
    measureHeight();
  }, [
    measureHeight,
    content.title,
    content.subtitle,
    content.desc,
    content.details,
    content.badges?.length,
    validLinks.length,
  ]);

  useEffect(() => {
    const compactEl = compactMeasureRef.current;
    const expandedEl = expandedMeasureRef.current;
    if (!compactEl || !expandedEl) return;

    const ro = new ResizeObserver(() => measureHeight());
    ro.observe(compactEl);
    ro.observe(expandedEl);
    return () => ro.disconnect();
  }, [measureHeight]);

  useEffect(() => {
    if (previousExpandedRef.current === isExpanded) {
      return;
    }

    previousExpandedRef.current = isExpanded;

    const t = window.setTimeout(() => {
      if (isExpanded) {
        props.onExpand?.();
      } else {
        props.onContract?.();
      }
    }, 240);

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

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

          <Text
            className={classNames(
              styles.desc,
              !validLinks.length && styles.descWithoutLinks,
            )}
          >
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
      <div className={styles.heightWrap} style={{ height }}>
        <div
          key={isExpanded ? "expanded" : "compact"}
          className={classNames(styles.switcher, styles.contentIn)}
        >
          {isExpanded ? <ExpandedContent /> : <CompactContent />}
        </div>
      </div>
      <div className={styles.measureWrap} aria-hidden="true">
        <div ref={compactMeasureRef}>
          <CompactContent />
        </div>
        <div ref={expandedMeasureRef}>
          <ExpandedContent />
        </div>
      </div>
    </div>
  );
}
