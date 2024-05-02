import React, { useEffect, useRef } from 'react';
import {
  BottomContainer,
  BackgroundContainer,
  HeaderContainer,
  ButtonContainer,
  Title,
  IconContainer,
  StyledPageContainer,
  TitleContainer,
  AbsoluteThymioIcon,
  FormContainer,
  InputBox,
} from '../../styles';
import { Button, Icon, Spinner, Typographie } from 'mobsya-theme';
import { useDataState, useEmitter } from '@/hooks/useLuciRCPjsonClient/stateMachine';
import { useTranslation } from 'react-i18next';

const Step2 = ({ next }: { next: (numStep: number) => void }) => {
  const { t } = useTranslation();
  const emit = useEmitter();
  const { isLoggedIn, isLoading } = useDataState();

  const [password, setPassword] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emit({ event: 'LOGIN', data: { password: password === '' ? 'password' : password } });
    console.log('onSubmit');
  };

  const onClick = () => {
    emit({ event: 'LOGIN', data: { password: password === '' ? 'thymiobymobsya' : password } });
    // console.log('click', { password: password === '' ? 'thymiobymobsya' : password });
  };

  useEffect(() => {
    if (isLoggedIn) {
      next(3);
    }
  }, [isLoggedIn]);

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
          <Title>{t('firstUse_step2_title')}</Title>
          <Typographie variant="paragraph">{t('firstUse_step2_subtitle')}</Typographie>
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

      <FormContainer onSubmit={onSubmit}>
        {isLoading ? (
          <Spinner color="#4B4F54" name="dual-ring" size={200} speed={60} />
        ) : (
          <InputBox
            id="password"
            placeholder="thymiobymobsya"
            label="Password"
            type="password"
            onChange={setPassword}
            value={password}
          />
        )}
      </FormContainer>

      <BottomContainer>
        <ButtonContainer>
          <Button variant="contained" size="large" onClick={() => onClick()} bgcolor="#452AB6">
            <Typographie variant="graphics" color="#fff" style={{ fontWeight: '600' }} size="1.6rem">
              {t('common_next')}
            </Typographie>
          </Button>
        </ButtonContainer>
      </BottomContainer>
    </StyledPageContainer>
  );
};

export default Step2;
