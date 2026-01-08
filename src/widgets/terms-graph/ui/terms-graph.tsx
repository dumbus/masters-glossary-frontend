import React, { useEffect, useRef } from 'react';

import { useTerms } from 'contexts/terms-context';
import cytoscape, { Core } from 'cytoscape';

import styles from './terms-graph.module.scss';

export const TermsGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const { terms } = useTerms();

  useEffect(() => {
    if (!containerRef.current || terms.length === 0) return;

    const data = terms;

    const nodes = data.map((term) => ({
      data: {
        id: term.id.toString(),
        label: term.term,
        source: term.source
      }
    }));

    const edges: Array<{
      data: {
        id: string;
        source: string;
        target: string;
        label: string;
      };
    }> = [];

    const addedPairs = new Set<string>();

    data.forEach((term) => {
      term.relations.forEach((relation) => {
        const sourceId = term.id;
        const targetId = relation.targetId;

        const pairKey = [sourceId, targetId].sort().join('-');

        if (!addedPairs.has(pairKey)) {
          addedPairs.add(pairKey);

          edges.push({
            data: {
              id: `${sourceId}-${targetId}`,
              source: sourceId.toString(),
              target: targetId.toString(),
              label: relation.relationType
            }
          });
        }
      });
    });

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#3E848C',
            label: 'data(label)',
            color: '#FFFFFF',
            'text-valign': 'center',
            'text-halign': 'center',
            width: 'label',
            height: 'label',
            shape: 'round-rectangle',
            padding: '10px',
            'font-size': '14px',
            'text-wrap': 'wrap',
            'text-max-width': '150px',
            'border-width': 2,
            'border-color': '#202022'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#202022',
            'target-arrow-color': '#202022',
            'target-arrow-shape': 'vee',
            'arrow-scale': 1,
            'curve-style': 'bezier',
            label: 'data(label)',
            'font-size': '12px',
            'text-rotation': 0,
            'text-margin-y': -10,
            color: '#202022',
            'text-background-color': '#7AB8BF',
            'text-background-opacity': 1,
            'text-background-padding': '4px',
            'text-background-shape': 'roundrectangle',
            'text-border-width': 1,
            'text-border-color': '#202022'
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        fit: true,
        padding: 50,
        directed: true,
        spacingFactor: 1.5,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: true
      }
    });

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [terms]);

  return <div ref={containerRef} className={styles.container} />;
};
