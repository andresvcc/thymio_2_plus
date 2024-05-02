import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfoCard } from './infocard'; // Asegúrate de que la ruta al componente es correcta
import StorageIcon from '@mui/icons-material/Storage'; // Asume importación correcta
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Asume importación correcta
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Asume importación correcta
import { TopologyData } from '../../types';

interface DataUsageCardProps {
  topologyData: TopologyData;
}

export function fromBytes(bytes = 0): string {
  const unidades = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let unidadIndex = 0;
  let tamaño = bytes;

  while (tamaño >= 1024 && unidadIndex < unidades.length - 1) {
    tamaño /= 1024;
    unidadIndex++;
  }

  // Formatear el tamaño con un máximo de un carácter decimal
  const tamañoFormateado = tamaño.toFixed(1);

  return `${tamañoFormateado} ${unidades[unidadIndex]}`;
}

export const DataUsageCard: React.FC<DataUsageCardProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  return (
    <InfoCard
      icon={<StorageIcon style={{ color: '#777', width: '2.2rem', height: '2.2rem' }} />}
      title={t('infocard_dataUsage_title')}
      info={[
        {
          label: t('infocard_dataUsage_downloaded'),
          value: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <ArrowDownwardIcon
                style={{ color: '#68BC5A', width: '1.1rem', height: '1.1rem', transform: 'translateY(0.1rem)' }}
              />
              <div style={{ color: '#777', fontWeight: 'bolder' }}>
                {fromBytes(topologyData.yourRouter.wlanInfo.dataTransfert.tx?.bytes ?? 0)}
              </div>
            </div>
          ),
        },
        {
          label: t('infocard_dataUsage_uploaded'),
          value: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <ArrowUpwardIcon
                style={{ color: '#68BC5A', width: '1.1rem', height: '1.1rem', transform: 'translateY(0.15rem)' }}
              />
              <div style={{ color: '#777', fontWeight: 'bolder' }}>
                {fromBytes(topologyData.yourRouter.wlanInfo.dataTransfert.rx.bytes)}
              </div>
            </div>
          ),
        },
      ]}
    />
  );
};
