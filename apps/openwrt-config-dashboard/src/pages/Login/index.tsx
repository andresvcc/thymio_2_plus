import React, { useEffect, useRef } from 'react';
import { FormContinaer, IconContainer, Input, LoginContainer, LoginForm } from './styles';
import { Body } from 'mobsya-theme';
import logoMobsya from '../../assets/logo-mobsya.png';
import { Button, Icon, Photo, Typographie } from 'mobsya-theme';
import { useEmitter } from '@/hooks/useLuciRCPjsonClient/stateMachine';
import { getLoginSid } from '@/hooks/useLuciRCPjsonClient/fetchCalls/getLoginToken';
import { LanguageSelector } from '@/hooks/useTraductions/component';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const HeaderConainter = styled.div`
  width: calc(100% - 1rem);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;

  @media (max-width: 768px) {
    width: calc(100% - 3.5rem);
  }
`;

const Login = () => {
  // const { login } = useHttpClient({ onlyLecture: true });
  const { t } = useTranslation();

  const [error, setError] = React.useState<string | null>(null);
  const [times, setTimes] = React.useState<number>(0);

  const emit = useEmitter();

  const onSubmit = (password: string) => {
    emit({ event: 'LOGIN', data: { password } });
  };

  const onLoginTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const password = (e.currentTarget[0] as HTMLInputElement).value;
    const sid = await getLoginSid({ password });
    if (sid === null) {
      setError('InvalidPassword');
      setTimes(5);
      return;
    } else {
      onSubmit(password);
    }
  };

  useEffect(() => {
    if (times === 0) {
      setError(null);
    }
    const interval = setInterval(() => {
      setTimes((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [times]);

  return (
    <Body
      pageName="login-page"
      header={
        <HeaderConainter>
          <LanguageSelector />
        </HeaderConainter>
      }
    >
      <LoginContainer>
        <Photo src={logoMobsya} height="2rem" objectFit="contain" />
        <IconContainer>
          <Icon
            name="mango"
            palleteFill={['#452AB6', '#FF0000', '#abababa', '#00FF00']}
            rotate={0}
            sizeH={250}
            sizeW={250}
          />
        </IconContainer>
        {error ? (
          <div
            style={{
              minHeight: '32vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Typographie variant="subtitle" color="#FF0000" colorGradient="#fb8500">
              {t(error)}
            </Typographie>
            <Typographie variant="subtitle" color="#FF0000" colorGradient="#fb8500">
              {t('awaitRetry', { times })}
            </Typographie>
          </div>
        ) : (
          <LoginForm onSubmit={onLoginTest}>
            <Typographie variant="title" color="#FF700D" colorGradient="#fb8500">
              {t('login_title')}
            </Typographie>
            <FormContinaer>
              <Input id="password" type="password" placeholder={t('placeholderInputPassword')} />
            </FormContinaer>
            <Button bgGradient="#FF700D" bgcolor="#fb8500" textcolor="#ffffff" variant="contained" width="100%">
              {t('loginButton')}
            </Button>
          </LoginForm>
        )}
      </LoginContainer>
    </Body>
  );
};

export default Login;
