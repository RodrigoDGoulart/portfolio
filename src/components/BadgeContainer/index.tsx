import styles from './BadgeContainer.module.scss';

import { BadgeType } from "../../@types";
import Badge from "../Badge";

interface Props {
  badges: BadgeType[];
  maxLength: number;
}

export default function BadgeContainer({ badges, maxLength }: Props) {
  return (
    <div className={styles.badges}>
      {badges?.slice(0, maxLength).map((badge) => (
        <Badge key={badge.label} {...badge} />
      ))}
      {badges?.length > maxLength && (
        <div className={styles.extra_badge}>
          +{badges?.length - maxLength} stacks
        </div>
      )}
    </div>
  );
}
