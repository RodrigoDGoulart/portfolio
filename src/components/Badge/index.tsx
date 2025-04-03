import styles from "./Badge.module.scss";
import chroma from "chroma-js";

import { BadgeType } from "../../@types";

export default function Badge({ icon: Icon, label, color }: BadgeType) {
  return (
    <div className={styles.badge} style={{ backgroundColor: color.primary }}>
      <div
        className={styles.icon_div}
        style={{ backgroundColor: color.secondary || "white" }}
      >
        <Icon className={styles.icon} style={{ color: color.primary }} />
      </div>
      <div
        className={styles.label}
        style={{
          color: chroma(color.primary).luminance() > 0.4 ? "black" : "white",
        }}
      >
        {label}
      </div>
    </div>
  );
}
