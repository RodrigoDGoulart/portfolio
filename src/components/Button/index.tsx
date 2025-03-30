import React from "react";

import { IconType } from "../../@types";

import styles from "./Button.module.scss";
import classNames from "classnames";

import Text from "../Text";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: "primary" | "secondary" | "text-only" | "link" | "tab";
  icon?: IconType;
  status?: "default" | "active";
}

export default function Button({
  styleType = "primary",
  icon: Icon,
  status = "default",
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
          [styles.active]: status === "active",
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
