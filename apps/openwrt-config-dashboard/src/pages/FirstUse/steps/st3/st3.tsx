import React, { useRef } from 'react';
import {
  BottomContainer,
  BackgroundContainer,
  HeaderContainer,
  Title,
  IconContainer,
  StyledPageContainer,
  TitleContainer,
  ButtonAndSkipContainer,
  FormContainer,
} from '../../styles';

import { Button, Icon, Spinner, Typographie } from 'mobsya-theme';
import { useDataState, useEmitter } from '@/hooks/useLuciRCPjsonClient/stateMachine';
import { updateRootPassword } from '@/hooks/useLuciRCPjsonClient/fetchCalls/updateRootPassword';
import { useTranslation } from 'react-i18next';
import { InputSelector } from './InputPassword';

const Step3 = ({ next }: { next: (numStep: number) => void }) => {
  const { t } = useTranslation();
  const emit = useEmitter();
  const { isLoggedIn, sid } = useDataState();

  const [isLoading, setIsLoading] = React.useState(false);

  const [inputPassword, setPassword] = React.useState('');
  const [inputPasswordConfirm, setPasswordConfirm] = React.useState('');

  const secure = [
    {
      type: t('firsUse_st3_passwordsMatch1'),
      calculate: inputPassword === inputPasswordConfirm && inputPasswordConfirm !== '',
    },
    {
      type: t('firsUse_st3_passwordsMatch2'),
      calculate: inputPassword.length >= 8,
    },
    {
      type: t('firsUse_st3_passwordsMatch3'),
      calculate: /\d/.test(inputPassword),
    },
    {
      type: t('firsUse_st3_passwordsMatch4'),
      calculate: /[a-z]/.test(inputPassword),
    },
    {
      type: t('firsUse_st3_passwordsMatch5'),
      calculate: /[A-Z]/.test(inputPassword),
    },
  ];

  const onNext = async () => {
    if (secure.reduce((acc, current) => current.calculate && acc, true)) {
      setIsLoading(true);

      const result = await updateRootPassword({
        newPassword: inputPassword,
        sidToken: sid,
      });

      if (result === 0) {
        emit({ event: 'LOGIN', data: { password: inputPassword } });
        setIsLoading(false);
        next(4);
      } else {
        setIsLoading(false);
        console.log('error', 'is not 0');
        next(0);
      }
    }
  };

  return (
    <StyledPageContainer>
      <BackgroundContainer />
      <HeaderContainer>
        <TitleContainer>
          <Title>{t('firsUse_st3_title')}</Title>
          <br />
          <Typographie variant="paragraph" size="0.9rem">
            {t('firsUse_st3_subtitle')}
          </Typographie>
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
      <FormContainer onSubmit={onNext}>
        {isLoading ? (
          <Spinner color="#4B4F54" name="dual-ring" size={200} speed={60} />
        ) : (
          <>
            <InputSelector
              id="password"
              placeholder={t('firsUse_st3_password_placeholder')}
              label={t('firsUse_st3_password_label')}
              type="password"
              onChange={setPassword}
            />
            <InputSelector
              id="passwordConfirm"
              placeholder={t('firsUse_st3_passwordConfirm_placeholder')}
              label={t('firsUse_st3_passwordConfirm_label')}
              type="password"
              onChange={setPasswordConfirm}
              secure={secure}
            />
          </>
        )}
      </FormContainer>
      <BottomContainer>
        <ButtonAndSkipContainer>
          <Button
            variant="contained"
            size="large"
            onClick={onNext}
            bgcolor={secure.reduce((acc, current) => current.calculate && acc, true) ? '#452AB6' : '#ababab'}
          >
            <Typographie variant="graphics" color="#fff" style={{ fontWeight: '600' }} size="1.6rem">
              {t('common_next')}
            </Typographie>
          </Button>
        </ButtonAndSkipContainer>
      </BottomContainer>
    </StyledPageContainer>
  );
};

export default Step3;
