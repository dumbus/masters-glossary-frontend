import React from 'react';

import { TermCardProps } from '../model/types';

import styles from './term-card.module.scss';

export const TermCard: React.FC<TermCardProps> = ({ term }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.term}>{term.term}</h3>
      <p className={styles.description}>{term.description}</p>
      <a href={term.source} target="_blank" rel="noopener noreferrer" className={styles.source}>
        Источник: {term.source || '-'}
      </a>
    </div>
  );
};

