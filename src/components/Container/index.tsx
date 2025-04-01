import Title from '../Title';
import styles from './Container.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default function Container({title, ...props}: Props) {
  return(
    <div className={styles.container}>
      <Title hightlight className={styles.title} >{title}</Title>
      <div {...props} />
    </div>
  )
}