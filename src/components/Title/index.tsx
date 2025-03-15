import classNames from "classnames";
import styles from './Title.module.scss';

interface Props {
  size?: "h1" | "h2" | "banner";
  children: React.ReactNode;
  hightlight?: boolean;
  className?: string;
}

export default function Title({ size = "h1", children, hightlight, className }: Props) {
  return (
    <h1
      className={classNames({
        [styles.title]: true,
        [styles[size]]: true,
        [styles.highlight]: hightlight,
        [className || ""]: true,
      })}
    >
      {children}
    </h1>
  );
}
