import React from 'react';

// TODO: Временно на время разработки, в будущем будет использоваться API
import termsData from 'data/terms.json';
import { Term } from 'types/termTypes';
import { TermCard } from 'widgets/term-card';

import styles from './glossary-page.module.scss';

export const GlossaryPage: React.FC = () => {
  const data = termsData as Term[];

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {data.map((term) => (
          <TermCard key={term.id} term={term} />
        ))}
      </div>
    </div>
  );
};
