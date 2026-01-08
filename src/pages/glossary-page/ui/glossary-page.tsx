import React from 'react';

import { useTerms } from 'contexts/terms-context';
import { TermCard } from 'widgets/term-card';

import styles from './glossary-page.module.scss';

export const GlossaryPage: React.FC = () => {
  const { terms } = useTerms();

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {terms.map((term) => (
          <TermCard key={term.id} term={term} />
        ))}
      </div>
    </div>
  );
};
