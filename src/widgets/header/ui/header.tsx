import React from 'react';

import glossaryIcon from '../../../assets/glossary.svg';
import graphIcon from '../../../assets/graph.svg';

import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <button type="button" className={styles.button}>
        <img src={glossaryIcon} alt="Глоссарий" className={styles.icon} />
        Глоссарий
      </button>

      <button type="button" className={styles.button}>
        <img src={graphIcon} alt="Семантический граф" className={styles.icon} />
        Семантический граф
      </button>
    </header>
  );
};
