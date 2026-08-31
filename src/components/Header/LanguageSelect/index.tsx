import styles from "./LanguageSelect.module.scss";

import ActionButton from "../../ActionButton";

import ArrowDownIcon from "../../../assets/icons/arrowdown.svg?react";
import i18next from "i18next";
import { useCallback } from "react";
import { IconType, LanguageType } from "../../../@types";

const EnIcon: IconType = ({ className, ...props }) => (
  <svg
    className={className}
    viewBox="0 0 32 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ ...props.style, width: 36, height: 18 }}
  >
    <text
      x="50%"
      y="50%"
      dy=".35em"
      textAnchor="middle"
      fill="currentColor"
      fontSize="16"
      fontWeight="700"
    >
      EN
    </text>
  </svg>
);

const BrIcon: IconType = ({ className, ...props }) => (
  <svg
    className={className}
    viewBox="0 0 32 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ ...props.style, width: 36, height: 18 }}
  >
    <text
      x="50%"
      y="50%"
      dy=".35em"
      textAnchor="middle"
      fill="currentColor"
      fontSize="16"
      fontWeight="700"
    >
      BR
    </text>
  </svg>
);

export default function LanguageSelect() {
  const current = i18next.language;

  const getCurrentLanguageCode = useCallback(() => {
    switch (current) {
      case "pt":
        return "BR";
      case "en":
        return "EN";
    }
  }, [current]);

  function setLanguage(lang: LanguageType) {
    i18next.changeLanguage(lang);
  }

  return (
    <ActionButton
      button={
        <button className={styles.btn}>
          <span className={styles.language_code}>
            {getCurrentLanguageCode()}
          </span>
          <ArrowDownIcon className={styles.arrow} />
        </button>
      }
      options={[
        {
          icon: BrIcon,
          label: "Português Brasileiro",
          onClick: () => setLanguage("pt"),
        },
        {
          icon: EnIcon,
          label: "English",
          onClick: () => setLanguage("en"),
        },
      ]}
      dropdownMenuProps={{
        align: "end",
        alignOffset: -6,
        side: "bottom",
        sideOffset: 28,
      }}
    />
  );
}
