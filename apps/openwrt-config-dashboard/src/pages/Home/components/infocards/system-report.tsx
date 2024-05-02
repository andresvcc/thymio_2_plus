import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoCard } from './infocard'; // Asegúrate de que la ruta al componente es correcta
import WarningIcon from '@mui/icons-material/Warning'; // Asume importación correcta
import { TopologyData } from '../../types'; // Asume una definición de tipo adecuada

interface SystemReportProps {
  topologyData: TopologyData;
}

export const SystemReport: React.FC<SystemReportProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  return (
    <InfoCard
      icon={<WarningIcon style={{ color: '#777', width: '2.2rem', height: '2.2rem' }} />}
      title={t('infocard_systemReport_title')}
      info={[
        {
          label: t('infocard_systemReport_errorsDetected'),
          value: (
            <div style={{ color: '#68BC5A', fontWeight: 'bolder', width: '100%', fontSize: '0.9rem' }}>
              {topologyData.yourRouter.wlanInfo.dataTransfert.rx.stats?.errors}
            </div>
          ),
        },
        {
          label: t('infocard_systemReport_collisionsDetected'),
          value: (
            <div style={{ color: 'orange', fontWeight: 'bolder', width: '100%', fontSize: '0.9rem' }}>
              {topologyData.yourRouter.wlanInfo.dataTransfert.rx.stats?.collisions}
            </div>
          ),
        },
      ]}
    />
  );
};
