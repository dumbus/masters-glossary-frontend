import React from 'react';

import { TermsGraph } from 'widgets/terms-graph';

import styles from './graph-page.module.scss';

export const GraphPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <TermsGraph />
    </div>
  );
};
