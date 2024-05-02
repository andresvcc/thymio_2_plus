/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { SimpleGridLayout, Layout } from 'mobsya-theme';
import NetworkTopology from '../../assets/topology';
import { useTranslation } from 'react-i18next';
import { Props } from '../../types';
import { Thymio2pStatus } from '../../components/infocards/thymio2pStatus';
import { InternetStatus } from '../../components/infocards/internetStatus';
import { SystemReport } from '../../components/infocards/system-report';
import { ActiveDevicesAndRobots } from '../../components/infocards/activeDevicesAndRobots';
import { TitleTopology } from '../../components/infocards/titleTopology';
import { timeAgo } from '../../assets/timeAgo';

const homeLayout: Layout = {
  pc: [
    { i: 'title-topology', x: 0, y: 0, w: 12, h: 10, static: true },
    { i: 'internet-status', x: 0, y: 11, w: 3.7, h: 8, static: true },
    { i: 'thymio-2+-status', x: 4, y: 11, w: 3.8, h: 8, static: true },
    { i: 'system-report', x: 8.1, y: 11, w: 3.6, h: 8, static: true },
    { i: 'connected-devices', x: 7, y: 32, w: 4.8, h: 47.6, static: true },
    { i: 'network-topology', x: 0, y: 20, w: 7, h: 47.6, static: true },
  ],
  tablet: [
    { i: 'title-topology', x: 0, y: 0, w: 12, h: 10, static: true },
    { i: 'internet-status', x: 0, y: 11, w: 3.7, h: 8, static: true },
    { i: 'thymio-2+-status', x: 4, y: 11, w: 3.8, h: 8, static: true },
    { i: 'system-report', x: 8.1, y: 11, w: 3.6, h: 8, static: true },
    { i: 'connected-devices', x: 6, y: 33, w: 5.5, h: 47.6, static: true },
    { i: 'network-topology', x: 0, y: 20, w: 6, h: 47.6, static: true },
  ],
  mobile: [
    { i: 'title-topology', x: 0, y: 0, w: 11.3, h: 8.5, static: true },
    { i: 'internet-status', x: 0, y: 11, w: 11.2, h: 8, static: true },
    { i: 'thymio-2+-status', x: 0, y: 22, w: 11.2, h: 8, static: true },
    { i: 'network-topology', x: 0, y: 35, w: 12, h: 27, static: true },
    { i: 'connected-devices', x: 0, y: 65, w: 12, h: 39, static: true },
  ],
};

const HomePage = ({ topologyData }: Props) => {
  const { t } = useTranslation();
  const timeAgoString = timeAgo(topologyData.yourRouter.ifStatus.uptime);

  return (
    <div style={{ width: 'calc(100% - 1rem)', height: '100%' }}>
      <SimpleGridLayout
        breakpoints={{ pc: 1200, tablet: 768, mobile: 480 }}
        cols={{ pc: 12, portable: 12, tablet: 12, mobile: 12, xs: 12 }}
        layout={homeLayout}
        margin={[1, 1]}
        items={{
          'title-topology': () => <TitleTopology topologyData={topologyData} />,
          'thymio-2+-status': () => <Thymio2pStatus topologyData={topologyData} />,
          'internet-status': () => <InternetStatus topologyData={topologyData} timeAgoString={timeAgoString} />,
          'system-report': () => <SystemReport topologyData={topologyData} />,
          'network-topology': () => <NetworkTopology topologyData={topologyData} />,
          'connected-devices': () => <ActiveDevicesAndRobots topologyData={topologyData} />,
        }}
      />
    </div>
  );
};

export default HomePage;
