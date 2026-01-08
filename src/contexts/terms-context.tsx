import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { termsService } from 'services/terms-service';
import { Term } from 'types/termTypes';

interface TermsContextValue {
  terms: Term[];
  loading: boolean;
  error: string | null;
}

const TermsContext = createContext<TermsContextValue | undefined>(undefined);

export const useTerms = (): TermsContextValue => {
  const context = useContext(TermsContext);
  if (!context) {
    throw new Error('useTerms must be used within TermsProvider');
  }
  return context;
};

interface TermsProviderProps {
  children: ReactNode;
}

export const TermsProvider: React.FC<TermsProviderProps> = ({ children }) => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        const data = await termsService.getTerms();
        setTerms(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load terms');
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return <TermsContext.Provider value={{ terms, loading, error }}>{children}</TermsContext.Provider>;
};
