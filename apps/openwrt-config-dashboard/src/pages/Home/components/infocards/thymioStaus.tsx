import { Icon } from 'mobsya-theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TopologyData } from '../../types';
import { InfoCard } from './infocard'; // Asume que la ruta al componente es correcta

interface ThymiosStatusCardProps {
  topologyData: TopologyData;
}

export const ThymiosStatusCard: React.FC<ThymiosStatusCardProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  return (
    <InfoCard
      icon={<Icon name="thymioSide" sizeW="3rem" sizeH="3rem" palleteFill={['#777']} />}
      title={t('infocard_thymiosStatus_title')}
      info={[
        {
          label: t('infocard_thymiosStatus_connectedThymios'),
          value: <div style={{ fontWeight: 'bolder', width: '100%' }}>{topologyData.yourRouter.robots.length}</div>,
        },
        {
          label: '',
          value: <div style={{ fontWeight: 'bolder', width: '100%', color: 'transparent' }}>0</div>,
        },
      ]}
    />
  );
};
