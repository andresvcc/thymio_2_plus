import React, { useEffect, useRef } from 'react';
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
} from '../FirstUse/styles';
import { Button, Icon, Spinner, Typographie } from 'mobsya-theme';
import { useNavigate } from 'react-router-dom';
import { useEmitter } from '@/hooks/useLuciRCPjsonClient/stateMachine';

const Step5 = () => {
  return (
    <StyledPageContainer>
      <BackgroundContainer />
      <HeaderContainer>
        <TitleContainer />
        <IconContainer />
      </HeaderContainer>
    </StyledPageContainer>
  );
};

export default Step5;
