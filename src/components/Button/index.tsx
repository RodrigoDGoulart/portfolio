import classNames from "classnames";
import React from "react";

import styles from "./Button.module.scss";
import Text from "../Text";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: "primary" | "secondary" | "text-only" | "link";
}

export default function Button({ styleType = "primary", ...props }: Props) {
  return (
    <button
      className={classNames(
        styles.button,
        {
          [styles[styleType]]: true,
          [styles["no-padding"]]:
            styleType === "text-only" || styleType === "link",
        },
        props.className
      )}
      {...props}
    >
      <Text className={classNames(styles.label, styles[styleType])}>
        {props.children}
      </Text>
    </button>
  );
}
