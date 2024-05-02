import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'mobsya-theme'; // Asume la importación correcta del componente Icon
import { TopologyData } from '../../types'; // Asume una definición de tipo adecuada

interface ActiveDevicesAndRobotsProps {
  topologyData: TopologyData;
}

export const ActiveDevicesAndRobots: React.FC<ActiveDevicesAndRobotsProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%', height: '100%', padding: '0.5rem' }}>
      <div>{t('activeDevices_label')}</div>
      {topologyData.yourRouter?.devices?.length === 0 && (
        <>
          <div>{t('noDevicesConnected_message')}</div>
        </>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 4rem)',
          gridGap: '2px',
          padding: '2px',
        }}
      >
        {[...topologyData?.yourRouter?.devices].map(({ id, active }) => (
          <div
            key={id}
            style={{
              width: '4rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Icon name="devices" sizeW="2.6rem" sizeH="2.6rem" palleteFill={[active ? '#452AB6' : '#777']} />
            <div
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontSize: '0.7rem',
                transform: 'translateY(-0.3rem)',
                textAlign: 'center',
                width: '4rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {id}
            </div>
          </div>
        ))}
      </div>

      <br />

      <div>{t('connectedRobots_label')}</div>
      {topologyData.yourRouter.robots.length === 0 && (
        <>
          <br />
          <span>{t('noRobotsConnected_message')}</span>
        </>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 4rem)', // Ajusta el tamaño mínimo según tus necesidades
          gridGap: '2px',
          padding: '2px',
          width: '100%',
        }}
      >
        {topologyData.yourRouter.robots.map(({ nodeId, status, type, name }) => (
          <div
            key={nodeId}
            style={{
              width: '4rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Centra el contenido en la dirección de la columna
            }}
          >
            <Icon
              name="thymioSide"
              sizeW="3rem"
              sizeH="3rem"
              palleteFill={[status === 'available' ? '#452AB6' : '#777']}
            />
            <div
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontSize: '0.7rem',
                transform: 'translateY(-0.3rem)',
                textAlign: 'center',
                width: '4rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
