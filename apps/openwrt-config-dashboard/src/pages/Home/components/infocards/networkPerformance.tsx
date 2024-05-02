import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoCard } from './infocard'; // Asegúrate de que la ruta al componente es correcta
import MemoryIcon from '@mui/icons-material/Memory'; // Asume importación correcta
import { TopologyData } from '../../types';

interface NetworkPerformanceCardProps {
  topologyData: TopologyData;
}

export const NetworkPerformanceCard: React.FC<NetworkPerformanceCardProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  return (
    <InfoCard
      icon={<MemoryIcon style={{ color: '#777', width: '2.2rem', height: '2.2rem' }} />}
      title={t('infocard_networkPerformance_title')}
      info={[
        {
          label: t('infocard_networkPerformance_bitRate'),
          value: (
            <div
              style={{
                color: '#777',
                fontWeight: 'bolder',
                width: '100%',
                fontSize: '0.8rem',
              }}
            >
              {topologyData.yourRouter.wlanInfo.bitRate}
            </div>
          ),
        },
        {
          label: t('infocard_networkPerformance_encryption'),
          value: (
            <div
              style={{
                color: '#777',
                fontWeight: 'bolder',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {topologyData.yourRouter.wlanInfo.encryption}
            </div>
          ),
        },
      ]}
    />
  );
};
