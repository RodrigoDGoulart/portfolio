import styles from "./TabContainer.module.scss";

import { useState, HTMLAttributes } from "react";

import { TabProp } from "../../@types";

import Button from "../Button";
import classNames from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  tabContent: TabProp[];
}

export default function TabContainer({ tabContent, ...props }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className={classNames(styles.container, props.className)} {...props}>
      <div className={styles.tabs}>
        {tabContent.map((tab, index) => (
          <Button
            key={tab.title}
            onClick={() => setSelectedIndex(index)}
            status={index === selectedIndex ? "active" : "default"}
            styleType="tab"
            className={styles.btn}
          >
            {tab.title}
          </Button>
        ))}
      </div>
      <div>{tabContent[selectedIndex].content}</div>
    </div>
  );
}
