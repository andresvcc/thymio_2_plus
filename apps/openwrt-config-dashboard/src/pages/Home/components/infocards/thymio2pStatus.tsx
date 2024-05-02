import React from 'react';

import { Icon } from 'mobsya-theme';
import { InfoCard } from './infocard';
import { useTranslation } from 'react-i18next';

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import { TopologyData } from '../../types';

export const Thymio2pStatus = ({ topologyData }: { topologyData: TopologyData }) => {
  const { t } = useTranslation();

  return (
    <InfoCard
      icon={<Icon name="mango" sizeW="5rem" sizeH="5rem" palleteFill={['#555']} />}
      title={t('infocard_thymio2pStatus_title')}
      info={[
        {
          label: t('infocard_thymio2pStatus_label1'),
          value: (
            <>
              {topologyData.yourRouter.ifStatus.device === 'phy0-sta0' ? (
                <div style={{ color: '#68BC5A', fontWeight: 'bolder', width: '100%' }}>
                  {t('infocard_thymio2pStatus_value1_active')}
                </div>
              ) : (
                <div style={{ color: '#777', fontWeight: 'bolder', width: '100%' }}>
                  {t('infocard_thymio2pStatus_value1_disabled')}
                </div>
              )}
            </>
          ),
        },
        {
          label: t('infocard_thymio2pStatus_label2'),
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
              {topologyData.yourRouter.wlanInfo.signal <= 0 && (
                <>
                  <div style={{ color: '#ff3333', fontWeight: 'bolder' }}>
                    {t('infocard_thymio2pStatus_value2_null')}
                  </div>
                </>
              )}
              {topologyData.yourRouter.wlanInfo.signal === 1 && (
                <>
                  <SignalCellularAlt1BarIcon style={{ color: '#ff3333', width: '1.1rem', height: '1.1rem' }} />
                  <div style={{ color: '#ff3333', fontWeight: 'bolder' }}>
                    {t('infocard_thymio2pStatus_value2_minimal')}
                  </div>
                </>
              )}
              {topologyData.yourRouter.wlanInfo.signal === 2 && (
                <>
                  <SignalCellularAlt2BarIcon style={{ color: '#ffcc00', width: '1.1rem', height: '1.1rem' }} />
                  <div style={{ color: '#ffcc00', fontWeight: 'bolder' }}>
                    {t('infocard_thymio2pStatus_value2_poor')}
                  </div>
                </>
              )}
              {topologyData.yourRouter.wlanInfo.signal === 3 && (
                <>
                  <SignalCellularAlt2BarIcon style={{ color: '#ec942c', width: '1.1rem', height: '1.1rem' }} />
                  <div style={{ color: '#ec942c', fontWeight: 'bolder' }}>
                    {t('infocard_thymio2pStatus_value2_good')}
                  </div>
                </>
              )}
              {topologyData.yourRouter.wlanInfo.signal >= 4 && (
                <>
                  <SignalCellularAltIcon style={{ color: '#68BC5A', width: '1.1rem', height: '1.1rem' }} />
                  <div style={{ color: '#68BC5A', fontWeight: 'bolder' }}>
                    {t('infocard_thymio2pStatus_value2_excellent')}
                  </div>
                </>
              )}
            </div>
          ),
        },
      ]}
    />
  );
};
