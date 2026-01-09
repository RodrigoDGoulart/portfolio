import styles from "./Item.module.scss";

import { TimelineItem as TimelineItemType } from "../../../@types";
import BadgeContainer from "../../BadgeContainer";
import { forwardRef } from "react";

interface Props {
  content: TimelineItemType;
}

const Dot = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref} className={styles.dot}></div>;
});

const TimelineItem = forwardRef<HTMLDivElement, Props>(
  ({ content }: Props, ref) => {
    return (
      <div className={styles.container}>
        <div>
          <Dot ref={ref} />
        </div>
        <div className={styles.content}>
          <div className={styles.titles}>
            <span className={styles.title}>{content.title}</span>
            <span className={styles.subtitle}>{content.subtitle}</span>
          </div>
          {content.desc
            .split("\n")
            .map(
              (desc) => desc && <p className={styles.desc}>{desc}</p>
            )}
          <BadgeContainer badges={content.badges} />
        </div>
      </div>
    );
  }
);

export default TimelineItem;
