import classNames from "classnames";
import HeartIcon from "../../assets/icons/heart.svg?react";

import styles from "./MadeWithLove.module.scss";

interface Props {
  wrapRow?: boolean;
}

export default function MadeWithLove({ wrapRow }: Props) {
  return (
    <div
      className={classNames(styles.container, { [styles["wrap"]]: wrapRow })}
    >
      <span>Made with</span>
      <HeartIcon className={styles.icon} />
      <span>
        by <b>Rodrigo Goulart</b>
      </span>
    </div>
  );
}
