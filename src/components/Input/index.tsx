import React from 'react';
import classNames from "classnames";

import styles from './Input.module.scss';

import { IconType } from "../../@types"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType;
}

export default function Input({icon: Icon, ...props}: Props) {
  return(
    <span className={classNames(styles.container, props.className)}>  
      {Icon && <Icon className={styles.icon} />}
      <input {...props} className={styles.input} />
    </span>
  )
}