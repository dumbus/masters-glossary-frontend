import React from 'react';

import githubIcon from 'assets/github.svg';
import glossaryIcon from 'assets/glossary.svg';
import graphIcon from 'assets/graph.svg';
import itmoLogo from 'assets/itmo.png';
import { Link, useLocation } from 'react-router-dom';

import styles from './header.module.scss';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
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
      </div>

      <div className={styles.contacts}>
        <a
          href="https://itmo.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.externalButton} ${styles.itmoButton}`}
        >
          <img src={itmoLogo} alt="ИТМО" className={styles.itmoLogo} />
        </a>

        <a
          href="https://github.com/dumbus"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.externalButton}`}
        >
          <img src={githubIcon} alt="GitHub" className={styles.icon} />
          Максим Дегтярёв
        </a>
      </div>
    </header>
  );
};
