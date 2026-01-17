import styles from "./Timeline.module.scss";

import { useEffect, useRef, useState } from "react";
import { TimelineItem as TimelineItemType } from "../../@types";
import TimelineItem from "./Item";

interface Props {
  items: TimelineItemType[];
}

export default function Timeline({ items }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstDotRef = useRef<HTMLDivElement | null>(null);
  const lastDotRef = useRef<HTMLDivElement | null>(null);

  const [firstDot, setFirstDot] = useState<
    { top: number; left: number } | undefined
  >(undefined);
  const [lastDot, setLastDot] = useState<
    { top: number; left: number } | undefined
  >(undefined);

  const [expandedIndex, setExpandedIndex] = useState(NaN);

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

    const ro = new ResizeObserver(() => {
      // joga pro próximo frame pra pegar o layout já “assentado”
      requestAnimationFrame(updatePositions);
    });

    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions, true);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions, true);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
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
            key={index}
            content={item}
            ref={isFirst ? firstDotRef : isLast ? lastDotRef : undefined}
            expanded={index === expandedIndex}
            onExpandRequest={() =>
              index === expandedIndex
                ? setExpandedIndex(NaN)
                : setExpandedIndex(index)
            }
          />
        );
      })}
    </div>
  );
}
