import React, { useEffect, useRef, useState } from 'react';
import {
  BottomContainer,
  BackgroundContainer,
  HeaderContainer,
  Title,
  IconContainer,
  StyledPageContainer,
  TitleContainer,
  ButtonAndSkipContainer,
  WifiList,
  WifiListFormContainer,
} from '../../styles';

import { Button, Icon, Typographie, Spinner } from 'mobsya-theme';
import { scannWifi, setExternalWifiParams } from '@/hooks/useLuciRCPjsonClient/fetchCalls/setWifiParams';
import { useDataState } from '@/hooks/useLuciRCPjsonClient/stateMachine';
import { dbmToSignalQuality, mapAuthSuiteToEncryption } from './mapAuthSuiteToEncryption';
import { useTranslation } from 'react-i18next';

type NetworkWifi = {
  ssid: string;
  security: string;
  signal: number;
};

const Step4 = ({ next }: { next: (numStep: number) => void }) => {
  const { t } = useTranslation();
  const { isLoggedIn, isLoading, sid, configs, ifStatus } = useDataState();
  const [times, setTimes] = useState<number>(0);

  const [networks, setNetworks] = useState<NetworkWifi[]>([]);
  const [message, setMessage] = useState<string>(t('firsUse_st4_message0'));

  const [isScanning, setIsScanning] = useState<boolean>(true);

  const [errors, setErrors] = useState<string[]>([]);

  const scann = async () => {
    if (networks.length === 0) {
      setMessage(t('firsUse_st4_message1'));
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      setMessage(t('firsUse_st4_message2'));
      await new Promise((resolve) => setTimeout(resolve, 20000));
    }

    setIsScanning(true);
    setMessage(t('firsUse_st4_message3', { status: ifStatus.device === 'phy0-sta0' ? 'Online' : 'Offline' }));
    const scannedWifi = await scannWifi({ sid, client: ifStatus.device === 'phy0-sta0' });

    if (scannedWifi) {
      setNetworks(
        scannedWifi
          .map(({ ssid, authSuites, signal }: any) => ({
            ssid,
            security: mapAuthSuiteToEncryption(authSuites),
            signal: dbmToSignalQuality(signal),
          }))
          .filter(({ ssid }: NetworkWifi) => !ssid.includes('\\x00'))
          .sort((a: NetworkWifi, b: NetworkWifi) => b.signal - a.signal),
      );

      setTimes(50);

      setMessage(t('firsUse_st4_message4'));
      // console.log('scannedWifi', scannedWifi);
      setIsScanning(false);
    } else {
      // console.log('error', 'The search has failed', scannedWifi);
      setErrors([t('firsUse_st4_error1')]);
    }
  };

  useEffect(() => {
    if (ifStatus.device !== '') {
      const addTime = async () => {
        if (times < 50) {
          setTimes(times + 1);
        } else {
          if (networks.length === 0) {
            setErrors([]);
          }
        }
      };

      const timeOut = setTimeout(() => {
        addTime();
      }, 1000);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [times]);

  useEffect(() => {
    if (ifStatus.device !== '' && errors.length === 0) {
      // console.log('ifStatus.device ->', 'Scann');
      scann();
    }
  }, [ifStatus.device]);

  useEffect(() => {
    if (!isScanning) {
      if (networks.length === 0) {
        setErrors(['Ho, no... a problem has occurred.']);
      } else {
        const timeOut2 = setTimeout(() => {
          // console.log('scann setTimeout');
          scann();
        }, 50000);

        return () => {
          clearTimeout(timeOut2);
        };
      }
    }
  }, [isScanning]);

  return (
    <StyledPageContainer>
      <BackgroundContainer />
      <HeaderContainer>
        <TitleContainer>
          <Title>{t('firsUse_st4_title')}</Title>
          <Typographie variant="paragraph">{t('firsUse_st4_subtitle')}</Typographie>
        </TitleContainer>
        <IconContainer>
          <Icon
            name="logoThymioByMobsya"
            palleteFill={['#452AB6', '#F57715']}
            palleteFillHover={['#452AB6AA', '#F57715AA']}
            rotate={0}
            sizeH={80}
            sizeW={160}
          />
        </IconContainer>
      </HeaderContainer>
      <WifiListFormContainer>
        {networks.length === 0 && errors.length === 0 ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Icon
              name="router"
              palleteFill={['#4B4F54']}
              palleteFillHover={['#ababab']}
              rotate={0}
              sizeH={140}
              sizeW={250}
            />
            <Spinner color="#4B4F54" name="dots" size={200} speed={199} />
            <div
              style={{
                padding: '2rem 1rem',
              }}
            >
              <span>{message}</span>
            </div>
          </div>
        ) : null}
        {networks.length > 0 && errors.length === 0 ? (
          <>
            <WifiList
              isScanning={isScanning}
              onConnect={async ({
                ssid,
                username,
                password,
                security,
              }: {
                ssid: string;
                username: string;
                password: string;
                security: string;
              }) => {
                const response = await setExternalWifiParams({
                  sid: sid,
                  params: {
                    ssid: ssid,
                    identity: username,
                    password: password,
                    encryption: security,
                  },
                });

                if (response.error === null) {
                  next(5);
                }
              }}
              networks={networks}
            />
          </>
        ) : errors.length > 0 ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '20rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              {errors.map((error, index) => (
                <span key={`error-sanc-${index}`}>{error}</span>
              ))}
              <br />
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  setErrors([]);
                  setNetworks([]);
                  setTimes(0);
                  scann();
                }}
                textcolor="#ffffff"
                bgcolor="#452AB6"
              >
                <Typographie variant="graphics" color="#ffffff" style={{ fontWeight: '600' }} size="1rem">
                  {t('common_try_again')}
                </Typographie>
              </Button>
            </div>
          </div>
        ) : null}
      </WifiListFormContainer>
      <BottomContainer>
        <ButtonAndSkipContainer>
          <Button variant="text" size="large" onClick={() => next(5)} textcolor="#452AB6">
            <Typographie variant="graphics" color="#452AB6" style={{ fontWeight: '600' }} size="1.6rem">
              {t('firsUse_skip_button')}
            </Typographie>
          </Button>
        </ButtonAndSkipContainer>
      </BottomContainer>
    </StyledPageContainer>
  );
};

export default Step4;
