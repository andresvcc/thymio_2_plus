import React from 'react';
import styled from 'styled-components';

type PageContainerProps = {
  children: React.ReactNode;
  pageName?: string;
  [x: string]: any;
};

const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1;
  height: 3rem;
`;

const BodyContainer = styled.div`
  padding-top: 3rem;
  padding: 1rem;
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const Body = styled(({ children, header, pageName, ...rest }: PageContainerProps) => {
  return (
    <div {...rest}>
      <HeaderContainer>{header}</HeaderContainer>
      <BodyContainer>{children}</BodyContainer>
    </div>
  );
})`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;
