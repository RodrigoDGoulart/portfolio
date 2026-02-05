import classNames from "classnames";
import styles from "./ToastMessage.module.scss";
import { useEffect, useState } from "react";

interface Props {
  message: string;
}

export default function ToastMessage({ message }: Props) {
  const [cacheMsg, setCacheMsg] = useState("");

  useEffect(() => {
    if (message !== "") setCacheMsg(message);
    else {
      setTimeout(() => {
        setCacheMsg(message);
      }, 200);
    }
  }, [message]);

  return (
    <div
      className={classNames(styles.container, !message ? styles.exit : "")}
      dangerouslySetInnerHTML={{ __html: cacheMsg }}
    />
  );
}
