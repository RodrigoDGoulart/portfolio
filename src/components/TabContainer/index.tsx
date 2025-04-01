import styles from './TabContainer.module.scss'

import { useState, HTMLAttributes } from "react";

import { TabProp } from "../../@types";

import Button from "../Button";
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  tabContent: TabProp[];
}

export default function TabContainer({tabContent, ...props}: Props) {
  const [selected, setSelected] = useState<TabProp>(tabContent[0]);

  return (
    <div className={classNames(styles.container, props.className)} {...props}>
      <div className={styles.tabs}>
        {tabContent.map((tab) => (
          <Button
            key={tab.title}
            onClick={() => setSelected(tab)}
            status={tab.title === selected.title ? "active" : "default"}
            styleType="tab"
            className={styles.btn}
          >
            {tab.title}
          </Button>
        ))}
      </div>
      <div>
        {selected.content}
      </div>
    </div>
  )
}