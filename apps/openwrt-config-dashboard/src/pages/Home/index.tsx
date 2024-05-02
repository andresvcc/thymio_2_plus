import { useMemo } from 'react';
import { NetworkStats } from '@/hooks/useLuciRCPjsonClient/fetchCalls/getWifiStatus';
import { Spinner, Typographie } from 'mobsya-theme';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DevicesPage from './section/Devices';
import HomePage from './section/Home';
import NetworkPage from './section/Network';
import ThymiosPage from './section/Thymios';
import { PagesProps, TopologyData } from './types';

const useDataParser = (routerData: any) => {
  const parsedData = useMemo<TopologyData>(
    () => ({
      cycle: routerData?.cycle ?? 0,
      isConnectedToInternet: routerData?.isConnectedToInternet ?? false,
      isConnectedToMainRouter: true,
      lastConnection: routerData.lastConnection,
      mainRouter: {
        id: 'mainRouter',
        thymios: [],
        robots: [],
      },
      yourRouter: {
        sid: routerData.sid,
        id: 'GL-MT300N-V2',
        isConnectedToInternet: routerData.isConnectedToInternet,
        ifStatus: routerData.ifStatus,
        configs: routerData.configs ?? {
          mode: 'ap',
          configFile: {
            sta: {
              ssid: routerData.configs?.configFile?.sta?.ssid ?? '',
              encryption: routerData.configs?.configFile?.sta?.encryption ?? '',
            },
            ap: {
              ssid: routerData.configs?.configFile?.ap?.ssid ?? '',
              password: routerData.configs?.configFile?.ap?.password ?? '',
            },
          },
        },
        wlanInfo: routerData.wlanInfo ?? {
          sta0ESSID: routerData.configs?.sta.ssid ?? '',
          encryption: routerData.configs?.sta.encryption ?? '',
          signal: 0,
          mode: ['none'],
          bitRate: '0 Mbit/s',
        },
        devices: routerData?.devices ?? [],
        robots: routerData?.robots ?? [],
      },
    }),
    [routerData],
  );

  return parsedData;
};

function Pages({ selected, routerData }: PagesProps) {
  const { t } = useTranslation();
  const [loadingMessage, setLoadingMessage] = useState<string>(t('loadingMessage0'));
  const [time, setTime] = useState<number>(0);
  const [isOK, setIsOK] = useState<boolean>(false);

  const topologyData = useDataParser(routerData);

  useEffect(() => {
    if (time < 40) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time]);

  useEffect(() => {
    // create constans ramdon true/false
    const random = Math.random() < 0.5;

    if (!isOK && time < 30 && time > 2 && random) {
      setLoadingMessage(t('loadingMessage1', { time: time * 3 }));
    }

    if (!isOK && time > 39) {
      setLoadingMessage(t('loadingMessageError'));
    }
  }, [time]);

  useEffect(() => {
    if (topologyData.yourRouter.wlanInfo?.signal !== 0) {
      setIsOK(true);
      setLoadingMessage(t('loadingMessage2'));
    }
  }, [topologyData.yourRouter.wlanInfo]);

  useEffect(() => {
    if (topologyData.yourRouter.ifStatus?.uptime !== 0 && topologyData.yourRouter.devices) {
      setIsOK(true);
      setLoadingMessage(t('loadingMessage3'));
    }
  }, [topologyData.yourRouter.ifStatus, topologyData.yourRouter.devices]);

  useEffect(() => {
    if (topologyData.yourRouter.ifStatus?.uptime !== 0 && routerData.uptime !== 0) {
      setIsOK(true);
      setLoadingMessage(t('loadingMessage4'));
    }
  }, [topologyData.yourRouter.ifStatus, routerData.uptime]);

  useEffect(() => {
    if (topologyData.yourRouter.ifStatus?.uptime !== 0 && routerData.configs.mode !== '') {
      setIsOK(true);
      setLoadingMessage(t('loadingMessage5'));
    }
  }, [topologyData.yourRouter.ifStatus, routerData.configs.mode]);

  if (topologyData.cycle <= 0) {
    return (
      <div
        style={{
          width: 'calc(100% - 1rem)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Spinner name="dual-ring" size={150} />
        <br />
        <Typographie>{loadingMessage}</Typographie>
      </div>
    );
  }

  const pages: { [key: string]: React.ReactNode } = {
    [t('menu_dashboard_home')]: <HomePage topologyData={topologyData} />,
    [t('menu_dashboard_network')]: <NetworkPage topologyData={topologyData} />,
    [t('menu_dashboard_devices')]: <DevicesPage topologyData={topologyData} />,
    [t('menu_dashboard_thtymios')]: <ThymiosPage topologyData={topologyData} />,
  };

  return <>{pages[selected]}</>;
}

export default Pages;
