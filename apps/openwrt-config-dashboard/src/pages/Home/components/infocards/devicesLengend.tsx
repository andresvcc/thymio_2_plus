import React from 'react';
import { useTranslation } from 'react-i18next';
import { TopologyData } from '../../types';

interface DevicesStatusCardProps {
  topologyData: TopologyData;
}

export const DeviceLengend: React.FC<DevicesStatusCardProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  // Función para generar el mensaje según el estado de la red y el conteo de dispositivos
  const devicesStatusMessage = (): string => {
    const networkStatusKey = topologyData.isConnectedToInternet ? 'online' : 'offline';
    const devicesCount = topologyData.yourRouter.devices.length;
    return t('infocard_devicesNetworkStatus_message', { context: networkStatusKey, count: devicesCount });
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: '1rem' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        {t('infocard_devicesNetworkStatus_title')}
      </div>
      <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>{devicesStatusMessage()}</div>
    </div>
  );
};
