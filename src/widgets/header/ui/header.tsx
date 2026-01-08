import React from 'react';

import glossaryIcon from 'assets/glossary.svg';
import graphIcon from 'assets/graph.svg';
import { Link, useLocation } from 'react-router-dom';

import styles from './header.module.scss';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Link
        to="/glossary"
        className={`${styles.button} ${location.pathname === '/glossary' || location.pathname === '/' ? styles.active : ''}`}
      >
        <img src={glossaryIcon} alt="Глоссарий" className={styles.icon} />
        Глоссарий
      </Link>

      <Link to="/graph" className={`${styles.button} ${location.pathname === '/graph' ? styles.active : ''}`}>
        <img src={graphIcon} alt="Семантический граф" className={styles.icon} />
        Семантический граф
      </Link>
    </header>
  );
};
