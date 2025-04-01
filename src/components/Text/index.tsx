import classNames from "classnames";
import styles from "./Text.module.scss";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  detach?: boolean;
}

export default function Text({ children, ...props }: Props) {
  return (
    <p
      {...props}
      className={classNames(
        styles.text,
        {
          [styles.detach]: props.detach,
        },
        props.className
      )}
    >
      {children}
    </p>
  );
}
