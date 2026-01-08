import React from 'react';

import { TermsProvider, useTerms } from 'contexts/terms-context';
import { Error } from 'features/error';
import { Loader } from 'features/loader';
import { GlossaryPage } from 'pages/glossary-page';
import { GraphPage } from 'pages/graph-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from 'widgets/header';

import styles from './app.module.scss';

import 'styles/styles.scss';

const AppContent: React.FC = () => {
  const { loading, error } = useTerms();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
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
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TermsProvider>
        <AppContent />
      </TermsProvider>
    </BrowserRouter>
  );
};
