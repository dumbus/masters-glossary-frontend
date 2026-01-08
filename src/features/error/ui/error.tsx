import React from 'react';

import { ErrorProps } from '../model/types';

import styles from './error.module.scss';

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ошибка</h1>
      <p className={styles.message}>{message}</p>
    </div>
  );
};
