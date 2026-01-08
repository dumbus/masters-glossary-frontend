import { Term } from 'types/termTypes';

const API_BASE_URL = 'https://dumbus-web-tech.ru/api';

export const termsService = {
  async getTerms(): Promise<Term[]> {
    const response = await fetch(`${API_BASE_URL}/terms`);

    if (!response.ok) {
      throw new Error(`Failed to fetch terms: ${response.statusText}`);
    }

    return response.json();
  }
};
