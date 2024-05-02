import React, { useEffect, useRef, useState } from 'react';
import {
  BottomContainer,
  BackgroundContainer,
  LogoContainer,
  HeaderContainer,
  ButtonContainer,
  Title,
  IconContainer,
  StyledPageContainer,
  TitleContainer,
  AbsoluteThymioIcon,
  TypographieFuseButton,
} from '../../styles';

import { Button, Icon, Spinner, Typographie } from 'mobsya-theme';
import { useDataState, useEmitter } from '@/hooks/useLuciRCPjsonClient/stateMachine';
import { setWirelessConfigFile } from '@/hooks/useLuciRCPjsonClient/fetchCalls/setWifiParams';
import { LanguageSelector } from './LanguageSelector';
import { RegionSelector } from './RegionSelector';
import LoadingScreen from './LoadingScreen';
import { useTranslation } from 'react-i18next';

const Step0 = ({ next }: { next: (stp: number) => void }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(false);
  const [times, setTimes] = useState<number>(0);
  const [retry, setRetry] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en');
  const [region, setRegion] = useState<string>('CH');

  const { isLoggedIn, isLoading, ifStatus, sid } = useDataState();

  const emit = useEmitter();

  useEffect(() => {
    setLoading(true);
    emit({ event: 'LOGOUT', data: {} });
  }, [isLoading]);

  useEffect(() => {
    if (times > 2 && !isLoggedIn) {
      emit({ event: 'LOGIN', data: { password: 'thymiobymobsya' } });
      setLoading(false);
    }
  }, [times]);

  useEffect(() => {
    const addTime = async () => {
      if (times < 5) {
        setTimes(times + 1);
      } else {
        if (!isLoggedIn) {
          setLoading(false);
        } else {
          setTimes(0);
          setRetry(true);
        }
      }
    };

    const timeOut = setTimeout(() => {
      addTime();
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [times]);

  const onGetStarted = async () => {
    setFetching(true);
    const isChanged = await setWirelessConfigFile({
      sid: sid,
      params: {
        country: region,
        language: language,
      },
    });

    if (isChanged) {
      emit({
        event: 'LANGUAGE',
        data: {
          country: region,
          language: language,
        },
      });
      next(2);
    }

    setFetching(false);
  };

  const onRetry = () => {
    setRetry(false);
    setTimes(0);
    setLoading(true);
  };

  if (loading && !isLoggedIn) {
    return <LoadingScreen loading={loading} retry={retry} times={times} onRetry={onRetry} />;
  }

  return (
    <StyledPageContainer>
      <BackgroundContainer>
        <AbsoluteThymioIcon x={-4} y={10} rotate={-10} scale={0.5} />
        <AbsoluteThymioIcon x={10} y={15} rotate={5} scale={0.7} />
        <AbsoluteThymioIcon x={-4} y={22} rotate={0} scale={0.7} />
        <AbsoluteThymioIcon x={20} y={28} rotate={0} scale={0.9} />
        <AbsoluteThymioIcon x={5} y={40} rotate={-10} scale={0.7} />
      </BackgroundContainer>
      <HeaderContainer>
        <TitleContainer>
          <Title>{t('firsUse_st1_title')}</Title>
          <Typographie variant="paragraph">{t('firsUse_st1_subtitle')}</Typographie>
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

      <LogoContainer>
        <Icon
          name="thymioLeftSide"
          rotate={0}
          sizeH={'35vh'}
          sizeW={'35vw'}
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
        <Typographie
          color="#fb8500"
          colorGradient="#fb8500AB"
          variant="graphics"
          size="min(max(2rem, 3vw), 5vw)"
          style={{ padding: 'min(max(1rem, 3vw), 6vw)' }}
        >
          &
        </Typographie>
        <Icon
          name="mango"
          palleteFill={['#452AB6', '#fb8500', '#fb8500', '#fb8500', '#fb8500']}
          rotate={0}
          sizeH={'25vh'}
          sizeW={'25vw'}
          style={{ transform: 'translateY(2vh)', maxWidth: '180px', maxHeight: '180px' }}
        />
      </LogoContainer>

      {!fetching ? (
        <>
          <LanguageSelector onSelectLanguage={setLanguage} />
          <br />
          <RegionSelector onSelectRegion={setRegion} />
        </>
      ) : (
        <Spinner name="dual-ring" size={120} speed={60} color="#452AB6" />
      )}

      <BottomContainer>
        {fetching ? null : (
          <ButtonContainer>
            <Button variant="contained" size="large" onClick={onGetStarted} bgcolor="#452AB6">
              <TypographieFuseButton variant="graphics" color="#fff" style={{ fontWeight: '600' }} size="1.6rem">
                {t('common_getStarted')}
              </TypographieFuseButton>
            </Button>
          </ButtonContainer>
        )}
      </BottomContainer>
    </StyledPageContainer>
  );
};

export default Step0;
