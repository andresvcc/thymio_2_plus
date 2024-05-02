/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { SimpleGridLayout, Layout } from 'mobsya-theme';
import { TopologyData } from '../../types';
import { ThymiosStatusCard } from '../../components/infocards/thymioStaus';
import { RobotsTable, RobotTableMobile } from '../../components/table/thymiosTable';
import { ThymiosLengend } from '../../components/infocards/thymioLengend';

const devicesLayout: Layout = {
  pc: [
    { i: 'thymios-lengend', x: 0, y: 0, w: 12, h: 10, static: true },
    { i: 'thymios-status', x: 0, y: 11, w: 3.6, h: 8, static: true },
    { i: 'thymios-table', x: 0, y: 30, w: 11.7, h: 48, static: true },
  ],
  tablet: [
    { i: 'thymios-lengend', x: 0, y: 0, w: 12, h: 10, static: true },
    { i: 'thymios-status', x: 0, y: 11, w: 3.6, h: 8, static: true },
    { i: 'thymios-table', x: 0, y: 30, w: 11.7, h: 48, static: true },
  ],
  mobile: [
    { i: 'thymios-status', x: 0, y: 0, w: 11.2, h: 9, static: true },
    { i: 'thymios-lengend', x: 0, y: 12.5, w: 11.3, h: 8.5, static: true },
    { i: 'thymios-table-mobile', x: 0, y: 28, w: 11.7, h: 48, static: true },
  ],
};

type Props = {
  topologyData: TopologyData;
};

const ThymiosPage = ({ topologyData }: Props) => {
  return (
    <div style={{ width: 'calc(100% - 1rem)', height: '100%' }}>
      <SimpleGridLayout
        breakpoints={{ pc: 1200, tablet: 768, mobile: 480 }}
        cols={{ pc: 12, portable: 12, tablet: 12, mobile: 12 }}
        layout={devicesLayout}
        margin={[1, 1]}
        items={{
          'thymios-lengend': () => <ThymiosLengend topologyData={topologyData} />,
          'thymios-status': () => <ThymiosStatusCard topologyData={topologyData} />,
          'thymios-table': () => <RobotsTable topologyData={topologyData} />,
          'thymios-table-mobile': () => <RobotTableMobile topologyData={topologyData} />,
        }}
      />
    </div>
  );
};

export default ThymiosPage;
