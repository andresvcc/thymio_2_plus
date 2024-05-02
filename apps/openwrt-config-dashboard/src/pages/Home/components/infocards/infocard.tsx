import React from 'react';
import styled from 'styled-components';

type values = {
  label: string;
  value: React.ReactNode;
};

type PropsInfoCard = {
  title?: string;
  info?: values[];
  icon?: React.ReactNode;
};

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #f1effa;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 0.5rem 0rem 0.5rem 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0rem;
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
`;

const IconContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 40%;
  transform: scale(1);
`;

const TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

const InfoRowContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 1rem);
  padding-right: 1rem;
`;

const ValueContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 35%;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  font-weight: lihter;
  text-align: right;

  @media (max-width: 800px) {
    width: 80%;
  }
`;

const LabelContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  font-weight: bold;
`;

const WhiteDivider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: calc(100% - 1rem);
  height: 1px;
  background: #fff;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

export const InfoCard = ({ icon, title, info = [] }: PropsInfoCard) => {
  return (
    <Card>
      <IconContent>{icon}</IconContent>
      <InfoContent>
        <TitleContent>{title}</TitleContent>
        <InfoRowContent>
          <LabelContent>{info[0]?.label}</LabelContent>
          <ValueContent>{info[0]?.value}</ValueContent>
        </InfoRowContent>
        <WhiteDivider />
        <InfoRowContent>
          <LabelContent>{info[1]?.label}</LabelContent>
          <ValueContent>{info[1]?.value}</ValueContent>
        </InfoRowContent>
      </InfoContent>
    </Card>
  );
};
