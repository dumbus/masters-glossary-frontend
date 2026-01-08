import React from 'react';

import { GlossaryPage } from 'pages/glossary-page';
import { GraphPage } from 'pages/graph-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from 'widgets/header';

import styles from './app.module.scss';

import 'styles/styles.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<GlossaryPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/graph" element={<GraphPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
