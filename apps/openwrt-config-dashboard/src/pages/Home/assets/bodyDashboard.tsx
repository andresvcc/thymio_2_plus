import React from 'react';
import styled from 'styled-components';

export const BodyDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 1rem;
  max-height: calc(100% - 4rem);
  width: calc(100vw - 12rem);
  transform: translateX(9rem) translateY(0rem);
`;

export const TitleDashboard = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: row;
  flex: 1;
  overflow: auto;
  padding: 0.2rem 1rem;
  max-height: 3rem;
  width: calc(100vw - 14rem);
  transform: translateX(10rem) translateY(1rem);
`;
