import styles from "./LanguageSelect.module.scss";

import ActionButton from "../../ActionButton";

import UsaIcon from "../../../assets/icons/countryFlags/usa_colored.svg?react";
import BrIcon from "../../../assets/icons/countryFlags/brazil_colored.svg?react";
import ArrowDownIcon from "../../../assets/icons/arrowdown.svg?react";
import i18next from "i18next";
import { useCallback } from "react";
import { LanguageType } from "../../../@types";

export default function LanguageSelect() {
  const current = i18next.language;

  const getCurrentFlag = useCallback(() => {
    switch (current) {
      case "pt":
        return <BrIcon className={styles.country_flag} />;
      case "en":
        return <UsaIcon className={styles.country_flag} />;
    }
  }, [current]);

  function setLanguage(lang: LanguageType) {
    i18next.changeLanguage(lang);
  }

  return (
    <ActionButton
      button={
        <button className={styles.btn}>
          <div className={styles.flag_border}>
            {getCurrentFlag()}
          </div>
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
          icon: UsaIcon,
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
