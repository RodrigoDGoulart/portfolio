import styles from "./Timeline.module.scss";

import { useEffect, useRef, useState } from "react";
import { TimelineItem as TimelineItemType } from "../../@types";
import TimelineItem from "./Item";

interface Props {
  items: TimelineItemType[];
}

export default function Timeline({ items }: Props) {
  const firstDotRef = useRef<HTMLDivElement | null>(null);
  const lastDotRef = useRef<HTMLDivElement | null>(null);

  const [firstDot, setFirstDot] = useState<
    { top: number; left: number } | undefined
  >(undefined);
  const [lastDot, setLastDot] = useState<
    { top: number; left: number } | undefined
  >(undefined);

  useEffect(() => {
    function updatePositions() {
      if (!firstDotRef.current || !lastDotRef.current) return;

      const first = firstDotRef.current;
      const last = lastDotRef.current;

      setFirstDot({
        top: first.offsetTop,
        left: first.offsetLeft,
      });

      setLastDot({
        top: last.offsetTop,
        left: last.offsetLeft,
      });
    }

    updatePositions();

    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions, true);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions, true);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.line}
        style={{
          top: firstDot?.top,
          left: (firstDot?.left || 0) + 3,
          height: lastDot && firstDot ? lastDot.top - firstDot.top : 0,
        }}
      />
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <TimelineItem
            content={item}
            ref={isFirst ? firstDotRef : isLast ? lastDotRef : undefined}
          />
        );
      })}
    </div>
  );
}
