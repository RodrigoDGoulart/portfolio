import styles from "./ActionButton.module.scss";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cloneElement } from "react";

import { IconType } from "../../@types";
import Button from "../Button";

interface Props {
  options: {
    icon: IconType;
    label: string;
    onClick: () => void;
  }[];
  button: React.ReactElement<
    React.ComponentProps<typeof Button>,
    typeof Button
  >;
}

export default function ActionButton(props: Props) {
  const content = (mode: "desktop" | "mobile") => {
    const deskProps: DropdownMenu.DropdownMenuContentProps = {
      align: "start",
      alignOffset: 0,
      side: "right",
      sideOffset: 6,
    };

    const mobileProps: DropdownMenu.DropdownMenuContentProps = {
      align: "center",
      alignOffset: 6,
      side: "top",
      sideOffset: 6,
    };

    const ContentProps = mode === "mobile" ? mobileProps : deskProps;

    return (
      <>
        <DropdownMenu.Trigger asChild>
          {cloneElement(props.button, { "aria-label": "Abrir menu" })}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            forceMount
            className={styles.menu}
            {...ContentProps}
          >
            {props.options.map((option, index) => (
              <DropdownMenu.Item
                key={index}
                className={styles.item}
                onSelect={option.onClick}
              >
                <option.icon className={styles.icon} />
                <span>{option.label}</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <DropdownMenu.Root>{content("desktop")}</DropdownMenu.Root>
      </div>
      <div className={styles.container_mobile}>
        <DropdownMenu.Root>{content("mobile")}</DropdownMenu.Root>
      </div>
    </>
  );
}
