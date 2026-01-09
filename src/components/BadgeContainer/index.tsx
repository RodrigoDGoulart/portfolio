import styles from "./BadgeContainer.module.scss";

import { BadgeType } from "../../@types";
import Badge from "../Badge";

interface Props {
  badges: BadgeType[];
  maxLength?: number;
  alignCenter?: boolean;
}

export default function BadgeContainer({
  badges,
  maxLength,
  alignCenter,
}: Props) {
  return (
    <div
      className={styles.badges}
      style={alignCenter ? { justifyContent: "center" } : {}}
    >
      {badges?.slice(0, maxLength).map((badge) => (
        <Badge key={badge.label} {...badge} />
      ))}
      {maxLength && badges?.length > maxLength && (
        <div className={styles.extra_badge}>
          +{badges?.length - maxLength} stacks
        </div>
      )}
    </div>
  );
}
