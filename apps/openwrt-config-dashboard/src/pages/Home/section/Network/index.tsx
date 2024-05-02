/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { SimpleGridLayout, Layout } from 'mobsya-theme';
import { TopologyData } from '../../types';
import { SettingForm } from '../../components/form/settingForm';
import { SettingExternalWifiForm } from '../../components/form/settingExternalWifiSelectForm';
import { SettingExternalWifiFormMobile } from '../../components/form/settingExternalWifiSelectFormMobile';
import { NetworkAndDevicesStatus } from '../../components/infocards/networkLegend';
import { InternetStatus } from '../../components/infocards/internetStatus';
import { Thymio2pStatus } from '../../components/infocards/thymio2pStatus';
import { DataUsageCard } from '../../components/infocards/dataUsage';
import { timeAgo } from '../../assets/timeAgo';
import { NetworkPerformanceCard } from '../../components/infocards/networkPerformance';
import { SystemReport } from '../../components/infocards/system-report';

const networkLayout: Layout = {
  pc: [
    { i: 'network-lengend', x: 0, y: 0, w: 12, h: 10, static: true },
    { i: 'internet-status', x: 0, y: 11, w: 3.7, h: 8, static: true },
    { i: 'thymio-2+-status', x: 4, y: 11, w: 3.6, h: 8, static: true },
    { i: 'data-ussage', x: 7.9, y: 11, w: 3.6, h: 8, static: true },
    { i: 'network-performance', x: 0, y: 23.5, w: 3.7, h: 8, static: true },
    { i: 'system-report', x: 4, y: 23.5, w: 3.6, h: 8, static: true },
    { i: 'wireless-local-form-settings', x: 0, y: 40, w: 3.7, h: 37, static: true },
    { i: 'wireless-external-form-settings', x: 4, y: 40, w: 3.7, h: 37, static: true },
  ],
  tablet: [
    { i: 'wireless-external-form-settings', x: 6, y: 50, w: 3.7, h: 37, static: true },
    { i: 'wireless-local-form-settings', x: 0, y: 50, w: 4, h: 37, static: true },
    { i: 'network-lengend', x: 0, y: 0, w: 12, h: 10, static: true },
    { i: 'data-ussage', x: 6, y: 28, w: 5.6, h: 12, static: true },
    { i: 'network-performance', x: 0, y: 28, w: 5.6, h: 12, static: true },
    { i: 'internet-status', x: 0, y: 12, w: 5.6, h: 12, static: true },
    { i: 'thymio-2+-status', x: 6, y: 12, w: 5.6, h: 12, static: true },
  ],
  mobile: [
    { i: 'internet-status', x: 0, y: 1, w: 11.2, h: 9, static: true },
    { i: 'network-performance', x: 0, y: 13, w: 11.2, h: 9, static: true },
    { i: 'network-lengend', x: 0, y: 26, w: 11.3, h: 10, static: true },
    { i: 'wireless-local-form-settings', x: 0, y: 45, w: 11.2, h: 28, static: true },
    { i: 'wireless-external-form-settings-mobile', x: 0, y: 78, w: 11.2, h: 28, static: true },
  ],
};

type Props = {
  topologyData: TopologyData;
};

const NetworkPage = ({ topologyData }: Props) => {
  const timeAgoString = timeAgo(topologyData.yourRouter.ifStatus.uptime);

  return (
    <div style={{ width: 'calc(100% - 1rem)', height: '100%' }}>
      <SimpleGridLayout
        breakpoints={{ pc: 1200, tablet: 768, mobile: 480 }}
        cols={{ pc: 12, portable: 12, tablet: 12, mobile: 12 }}
        layout={networkLayout}
        margin={[1, 1]}
        items={{
          'network-lengend': () => <NetworkAndDevicesStatus topologyData={topologyData} />,
          'internet-status': () => <InternetStatus topologyData={topologyData} timeAgoString={timeAgoString} />,
          'thymio-2+-status': () => <Thymio2pStatus topologyData={topologyData} />,
          'data-ussage': () => <DataUsageCard topologyData={topologyData} />,
          'network-performance': () => <NetworkPerformanceCard topologyData={topologyData} />,
          'system-report': () => <SystemReport topologyData={topologyData} />,
          'wireless-local-form-settings': () => <SettingForm topologyData={topologyData} />,
          'wireless-external-form-settings': () => <SettingExternalWifiForm topologyData={topologyData} />,
          'wireless-external-form-settings-mobile': () => <SettingExternalWifiFormMobile topologyData={topologyData} />,
        }}
      />
    </div>
  );
};

export default NetworkPage;
