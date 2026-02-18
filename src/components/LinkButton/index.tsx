import React from "react";

import { IconType } from "../../@types";

import styles from "./LinkButton.module.scss";
import classNames from "classnames";

import Text from "../Text";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  styleType?: "primary" | "secondary" | "text-only" | "link" | "tab";
  icon?: IconType;
  status?: "default" | "active";
}

export default function LinkButton({
  styleType = "primary",
  icon: Icon,
  status = "default",
  ...props
}: Props) {
  return (
    <a
      {...props}
      className={classNames(
        styles.button,
        styles[styleType],
        {
          [styles["no-padding"]]:
            styleType === "text-only" || styleType === "link",
          [styles.active]: status === "active",
        },
        props.className // Mantenha props.className no final para combinar corretamente
      )}
    >
      {Icon && <Icon className={classNames(styles.icon, styles[styleType])} />}
      <Text className={classNames(styles.label, styles[styleType])}>
        {props.children}
      </Text>
    </a>
  );
}
