import React from 'react';
import { useTranslation } from 'react-i18next';
import { TopologyData } from '../../types';
import { InfoCard } from './infocard';
import { Icon } from 'mobsya-theme';

interface DevicesStatusCardProps {
  topologyData: TopologyData;
}

export const DevicesStatusCard: React.FC<DevicesStatusCardProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  return (
    <InfoCard
      icon={<Icon name="devices" sizeW="2.2rem" sizeH="2.2rem" palleteFill={['#777']} />}
      title={t('infocard_devicesStatus_title')}
      info={[
        {
          label: t('infocard_devicesStatus_connectedDevices'),
          value: <div style={{ fontWeight: 'bolder', width: '100%' }}>{topologyData.yourRouter.devices.length}</div>,
        },
        {
          label: ' ',
          value: <div style={{ fontWeight: 'bolder', width: '100%', color: 'transparent' }}>0</div>,
        },
      ]}
    />
  );
};
