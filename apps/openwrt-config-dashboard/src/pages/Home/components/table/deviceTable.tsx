import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from '.';
import { TopologyData } from '../../types';

interface DevicesTableProps {
  topologyData: TopologyData;
}

export const DeviceTable: React.FC<DevicesTableProps> = ({ topologyData }) => {
  const { t } = useTranslation();
  return (
    <Table
      columns={[
        { key: 'id', label: t('devices_table_name'), render: (value) => value },
        {
          key: 'active',
          label: t('devices_table_status'),
          render: (value) => (value ? t('devices_table_status_connected') : t('devices_table_status_denied')),
        },
        { key: 'ip', label: t('devices_table_ip'), render: (value) => value },
        { key: 'mac', label: t('devices_table_mac'), render: (value) => value },
      ]}
      data={topologyData.yourRouter.devices}
    />
  );
};
