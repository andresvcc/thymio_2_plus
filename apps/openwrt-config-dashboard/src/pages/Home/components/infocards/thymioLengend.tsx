import React from 'react';
import { useTranslation } from 'react-i18next';
import { TopologyData } from '../../types';

interface ThymiosNetworkStatusCardProps {
  topologyData: TopologyData;
}

export const ThymiosLengend: React.FC<ThymiosNetworkStatusCardProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  // Función para generar el mensaje según el estado de la red
  const networkStatusMessage = (): string => {
    const networkStatus = topologyData.isConnectedToInternet ? 'Online' : 'Offline';
    const thymiosCount = topologyData.yourRouter.robots.length;
    return t('infocard_thymiosLengend_message', { networkStatus, thymiosCount });
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: '1rem' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        {t('infocard_thymiosLengend_title')}
      </div>
      <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>{networkStatusMessage()}</div>
    </div>
  );
};
