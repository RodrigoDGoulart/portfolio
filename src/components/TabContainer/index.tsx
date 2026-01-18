import styles from "./TabContainer.module.scss";
import { useLayoutEffect, useRef, useState, HTMLAttributes } from "react";
import classNames from "classnames";

import { TabProp } from "../../@types";
import Button from "../Button";

interface Props extends HTMLAttributes<HTMLDivElement> {
  tabContent: TabProp[];
}

export default function TabContainer({ tabContent, ...props }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // index realmente renderizado
  const [renderedIndex, setRenderedIndex] = useState(0);

  const [height, setHeight] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const innerRef = useRef<HTMLDivElement | null>(null);

  function measureHeight() {
    const el = innerRef.current;
    if (!el) return;
    setHeight(el.scrollHeight);
  }

  // mede quando o conteúdo renderizado muda
  useLayoutEffect(() => {
    measureHeight();
  }, [renderedIndex]);

  // acompanha mudanças internas (opcional)
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(measureHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, [renderedIndex]);

  function handleSelect(nextIndex: number) {
    if (nextIndex === selectedIndex) return;

    // inicia fade-out
    setIsFading(true);

    // após o fade-out, troca o conteúdo
    setTimeout(() => {
      setRenderedIndex(nextIndex);
      setSelectedIndex(nextIndex);

      // garante medição + fade-in no frame seguinte
      requestAnimationFrame(() => {
        measureHeight();
        setIsFading(false);
      });
    }, 200); // igual ao tempo do fade no CSS
  }

  return (
    <div className={classNames(styles.container, props.className)} {...props}>
      <div className={styles.tabs}>
        {tabContent.map((tab, index) => (
          <Button
            key={tab.title}
            onClick={() => handleSelect(index)}
            status={index === selectedIndex ? "active" : "default"}
            styleType="tab"
            className={styles.btn}
          >
            {tab.title}
          </Button>
        ))}
      </div>

      <div className={styles.panel} style={{ height }}>
        <div
          ref={innerRef}
          className={classNames(styles.inner, isFading && styles.fadeOut)}
        >
          {tabContent[renderedIndex].content}
        </div>
      </div>
    </div>
  );
}
