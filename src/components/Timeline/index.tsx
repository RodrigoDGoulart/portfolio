import styles from './Timeline.module.scss';

import { useEffect, useRef, useState } from "react";
import { TimelineItem as TimelineItemType } from "../../@types";
import TimelineItem from "./Item";

interface Props {
  items: TimelineItemType[];
}

export default function Timeline({ items }: Props) {
  const firstDotRef = useRef<HTMLDivElement | null>(null);
  const lastDotRef = useRef<HTMLDivElement | null>(null);

  const [firstDot, setFirstDot] = useState<DOMRect | undefined>(undefined);
  const [lastDot, setLastDot] = useState<DOMRect | undefined>(undefined);

  useEffect(() => {
    function updatePositions() {
      const first = firstDotRef.current?.getBoundingClientRect();
      const last = lastDotRef.current?.getBoundingClientRect();
  
      setFirstDot(first);
      setLastDot(last);
    }
  
    updatePositions(); // calcula na montagem
  
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions, true); // true = captura dentro de scrollables também
  
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
          height: lastDot?.y
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
