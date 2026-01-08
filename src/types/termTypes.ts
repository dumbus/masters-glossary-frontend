interface TermRelation {
  targetId: number;
  relationType: string;
}

export interface Term {
  id: number;
  term: string;
  description: string;
  source: string;
  relations: TermRelation[];
}
