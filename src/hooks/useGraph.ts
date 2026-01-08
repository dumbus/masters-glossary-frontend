import { useEffect, useRef } from 'react';

import cytoscape, { Core, ElementsDefinition } from 'cytoscape';

interface UseGraphParams {
  container: HTMLDivElement | null;
  elements: ElementsDefinition;
}

export const useGraph = ({ container, elements }: UseGraphParams) => {
  const cyRef = useRef<Core | null>(null);

  useEffect(() => {
    if (!container) return;

    cyRef.current = cytoscape({
      container,
      elements,
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
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 0.25,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      }
    });

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [container, elements]);

  return cyRef.current;
};
