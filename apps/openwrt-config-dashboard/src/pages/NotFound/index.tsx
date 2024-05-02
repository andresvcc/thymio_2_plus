import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f1f1f1;
`;

const NotFoundTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const NotFoundText = styled.p`
  font-size: 1rem;
  color: #555;
`;

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <NotFoundContainer>
      <NotFoundTitle>{t('NotFoundTitle')}</NotFoundTitle>
      <NotFoundText>{t('NotFoundText')}</NotFoundText>
    </NotFoundContainer>
  );
};

export default NotFound;
