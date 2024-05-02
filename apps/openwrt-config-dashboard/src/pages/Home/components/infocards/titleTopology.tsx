import React from 'react';
import { useTranslation } from 'react-i18next';
import { TopologyData } from '../../types'; // Asegúrate de ajustar la ruta según sea necesario

interface TitleTopologyProps {
  topologyData: TopologyData;
}

export const TitleTopology: React.FC<TitleTopologyProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%', height: '100%', padding: '1rem' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t('networkTopology_title')}</div>
      {[topologyData.yourRouter.wlanInfo.mode.includes('Client') ? t('networkTopology_onlineMessage') : ''].map(
        (text, index) => (
          <div key={index} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            {text}
          </div>
        ),
      )}
    </div>
  );
};
