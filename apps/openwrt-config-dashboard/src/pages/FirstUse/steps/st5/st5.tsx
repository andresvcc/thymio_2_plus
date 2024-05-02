import React, { useEffect, useRef, useState } from 'react';
import {
  BackgroundContainer,
  LogoContainer,
  HeaderContainer,
  Title,
  IconContainer,
  StyledPageContainer,
  TitleContainer,
  AbsoluteThymioIcon,
} from '../../styles';
import { Button, Icon, Spinner, Typographie } from 'mobsya-theme';
import { useNavigate } from 'react-router-dom';
import { useEmitter } from '@/hooks/useLuciRCPjsonClient/stateMachine';
import { useTranslation } from 'react-i18next';

const Step5 = ({ next }: { next: (stp: number) => void }) => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const emit = useEmitter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      emit({ event: 'COMPLET_STEP_FIRSTUSE', data: {} });
    }, 3000);

    const timeout2 = setTimeout(() => {
      emit({ event: 'COMPLET_STEP_FIRSTUSE', data: {} });
      setError('router not responding');
    }, 6000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

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
          <Title>{t('firsUse_st5_title')}</Title>
          <Typographie variant="paragraph">{t('firsUse_st5_subtitle')}</Typographie>
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
      <LogoContainer style={{ opacity: '0.4' }}>
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
      <Spinner color="#4B4F54" name="dots" size={200} speed={199} />
      {error === 'router not responding' ? (
        <>
          <div>Error: {error}</div>
        </>
      ) : null}
    </StyledPageContainer>
  );
};

export default Step5;
