import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoCard } from './infocard';
import { Icon } from 'mobsya-theme'; // Asume la importación correcta del componente Icon
import { TopologyData } from '../../types'; // Asume una definición de tipo adecuada

interface InternetStatusProps {
  topologyData: TopologyData;
  timeAgoString: string; // Asume que esta prop es una cadena que describe hace cuánto tiempo se conectó o desconectó internet
}

export const InternetStatus: React.FC<InternetStatusProps> = ({ topologyData, timeAgoString }) => {
  const { t } = useTranslation();

  return (
    <InfoCard
      icon={<Icon name="internet" sizeW="2.2rem" sizeH="2.2rem" palleteFill={['#777']} />}
      title={t('infocard_internetStatus_title')}
      info={[
        {
          label: t('infocard_internetStatus_label'),
          value: (
            <div
              style={{
                color: topologyData.isConnectedToInternet ? '#68BC5A' : '#777',
                fontWeight: 'bolder',
                width: '100%',
              }}
            >
              {topologyData.isConnectedToInternet
                ? t('infocard_internetStatus_connected')
                : t('infocard_internetStatus_disconnected')}
            </div>
          ),
        },
        {
          label: t(
            topologyData.isConnectedToInternet
              ? 'infocard_internetStatus_uptime'
              : 'infocard_internetStatus_offlineFrom',
          ),
          value: <div style={{ fontWeight: 'bolder', width: '100%' }}>{timeAgoString}</div>,
        },
      ]}
    />
  );
};
