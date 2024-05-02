// LanguageSelector.tsx
import { useDataState, useEmitter } from '@/hooks/useLuciRCPjsonClient/stateMachine';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTraductions } from '..';

const DropdownContainer = styled.div`
  width: 100%;
  max-width: 120px;
  margin: 0;
  padding: 0;
`;

const SelectContainer = styled.div`
  width: 100%;
  max-width: 120px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  margin: 8px 0;

  &:hover {
    border-color: #3f51b5;
  }

  &::after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%) scaleY(0.5);
    pointer-events: none;
    font-size: 16px;
    color: #888;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 30px 10px 10px; /* Aumenta el padding derecho para el icono */
  appearance: none; /* Remueve la apariencia por defecto */
  -webkit-appearance: none; /* Remueve la apariencia por defecto en Safari */
  -moz-appearance: none; /* Remueve la apariencia por defecto en Firefox */
  border: none;
  background-color: transparent;
  font-size: 16px;
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    border-color: #3f51b5;
    box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
  }
`;

export const LanguageSelector = () => {
  const { language, set } = useTraductions();

  const onChangeLanguage = (e: { target: { value: any } }) => {
    set(e.target.value);
  };

  return (
    <SelectContainer>
      <Select value={language} onChange={onChangeLanguage}>
        <option value="fr">Français</option>
        <option value="en">English</option>
      </Select>
    </SelectContainer>
  );
};
