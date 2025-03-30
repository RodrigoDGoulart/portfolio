import React from "react";

import styles from "./Button.module.scss";
import classNames from "classnames";

import Text from "../Text";
import { IconType } from "../../@types";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: "primary" | "secondary" | "text-only" | "link";
  icon?: IconType;
}

export default function Button({
  styleType = "primary",
  icon: Icon,
  ...props
}: Props) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[styleType],
        {
          [styles["no-padding"]]:
            styleType === "text-only" || styleType === "link",
        },
        props.className
      )}
      {...props}
    >
      {Icon && <Icon className={classNames(styles.icon, styles[styleType])} />}
      <Text className={classNames(styles.label, styles[styleType])}>
        {props.children}
      </Text>
    </button>
  );
}
