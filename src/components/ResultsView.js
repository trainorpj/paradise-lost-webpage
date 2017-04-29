import React from 'react';
import {GRAPHS, SAMPLERS, METRICS} from '../constants';
import NavBar from './NavBar';
import BarCode from './BarCode';
import PersDiagram from './PersDiagram';
import DistMatrix from './DistMatrix';

const graphStyles = {
  width: 300,
  height: 300,
  margin: {
    sides: 20,
    top: 10,
    bottom: 10,
  },
};

const renderMetricGraph = (graph, data, graphStyles) => {
  switch (graph) {
    case 'barcode':
      return <BarCode data={data.persistenceData} styles={graphStyles} />;
    case 'persistence':
      return <PersDiagram data={data.persistenceData} styles={graphStyles} />;
    case 'matrix':
      return <DistMatrix data={data.matrix} styles={graphStyles} />;
    default:
      return <div>Select a View!</div>;
  }
};

const renderNavBar = (identifier, data, fcn) => {
  switch (identifier) {
    case 'Sample':
      return (
        <NavBar
          identifier={'Sample'}
          items={SAMPLERS}
          navSelector={'sampler'}
          navFcn={fcn}
          selectQuery={data}
        />
      );
    case 'Metric':
      return (
        <NavBar
          identifier={'Metric'}
          items={METRICS}
          navSelector={'metric'}
          navFcn={fcn}
          selectQuery={data}
        />
      );
    case 'Graph':
      return (
        <NavBar
          identifier={'Graph'}
          items={GRAPHS}
          navSelector={'graph'}
          navFcn={fcn}
          selectQuery={data}
        />
      );
    default:
      return <div>NavBar</div>;
  }
};

function ResultsView({sampler, metric, data, graph, actions}) {
  const updateView = actions.updateView;
  return (
    <div>
      {renderNavBar('Sample', sampler, updateView)}
      {renderNavBar('Metric', metric, updateView)}
      {renderNavBar('Graph', graph, updateView)}
      <svg width={graphStyles.width} height={graphStyles.height}>
        {renderMetricGraph(graph, data, graphStyles)}
      </svg>
    </div>
  );
}

export default ResultsView;