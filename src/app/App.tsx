import React from 'react';

import { GraphPage } from 'pages/graph-page';
import { Header } from 'widgets/header';

import styles from './app.module.scss';

import 'styles/styles.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.content}>
        <GraphPage />
      </div>
    </div>
  );
};
