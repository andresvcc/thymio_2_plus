import React from 'react';
import { Table } from '.';
import { TopologyData } from '../../types';

interface DevicesTableProps {
  topologyData: TopologyData;
}

export const DeviceTableMobile: React.FC<DevicesTableProps> = ({ topologyData }) => {
  return (
    <Table
      columns={[
        { key: 'id', label: 'Device name', render: (value) => value },
        {
          key: 'active',
          label: 'Status',
          render: (value) => (value ? 'Connected' : 'Discoverable'),
        },
        { key: 'ip', label: 'IP', render: (value) => value },
      ]}
      data={topologyData.yourRouter.devices}
    />
  );
};
