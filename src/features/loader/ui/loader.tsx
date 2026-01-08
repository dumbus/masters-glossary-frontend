import React from 'react';

import styles from './loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
};
