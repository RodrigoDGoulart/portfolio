import { forwardRef, useLayoutEffect, useRef, useState } from "react";

import styles from "./Item.module.scss";

import { TimelineItem as TimelineItemType } from "../../../@types";
import BadgeContainer from "../../BadgeContainer";

import ArrowDownIcon from "../../../assets/icons/arrowdown.svg?react";
import ArrowUpIcon from "../../../assets/icons/arrowup.svg?react";

interface Props {
  content: TimelineItemType;
  expanded?: boolean;
  onExpandRequest?: () => void;
}

const Dot = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref} className={styles.dot}></div>;
});

const TimelineItem = forwardRef<HTMLDivElement, Props>(
  ({ content, ...props }: Props, ref) => {
    const bodyInnerRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number>(0);

    useLayoutEffect(() => {
      const el = bodyInnerRef.current;
      if (!el) return;

      if (props.expanded) {
        // garante medir depois do DOM atualizar
        const next = el.scrollHeight;
        setHeight(next);
      } else {
        setHeight(0);
      }
    }, [props.expanded, content.desc, content.badges?.length]);

    return (
      <div className={styles.container}>
        <div>
          <Dot ref={ref} />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <button onClick={props.onExpandRequest}>
              {props.expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>
            <div className={styles.titles}>
              <span className={styles.title}>{content.title}</span>
              <span className={styles.subtitle}>{content.subtitle}</span>
            </div>
          </div>
          <div
            className={`${styles.expand} ${props.expanded ? styles.open : ""}`}
            style={{ height }}
            aria-hidden={!props.expanded}
          >
            <div ref={bodyInnerRef} className={styles.expandInner}>
              <BadgeContainer badges={content.badges} />
              <div>
                {content.desc.split("\n").map(
                  (desc, i) =>
                    desc && (
                      <p key={i} className={styles.desc}>
                        {desc}
                      </p>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default TimelineItem;
