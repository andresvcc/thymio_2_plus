import React from 'react';
import { useTranslation } from 'react-i18next';
import { TopologyData } from '../../types';

interface NetworkAndDevicesStatusProps {
  topologyData: TopologyData;
}

export const NetworkAndDevicesStatus: React.FC<NetworkAndDevicesStatusProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  // Preparar mensajes dinámicos
  const networkStatusMessage = t('infocard_networkAndDevicesStatus_networkStatus', {
    status: topologyData.isConnectedToInternet ? t('common_online') : t('common_offline'),
    count: topologyData.yourRouter.devices.length,
  });

  return (
    <div style={{ width: '100%', height: '100%', padding: '1rem' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'Roboto' }}>
        {t('infocard_networkAndDevicesStatus_title')}
      </div>
      <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', fontFamily: 'Roboto' }}>{networkStatusMessage}</div>
    </div>
  );
};
