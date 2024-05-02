import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SecureContainer } from '../../styles';

import {
  BackgroundLabelContainer,
  ContainerInput, // Usaremos este styled-component para estilizar el input directamente
  LabelContainer,
  SecureText,
  SelectContainer,
} from './styles';

export const InputSelector = ({
  label,
  placeholder,
  type,
  onChange,
  disabled,
  value,
  id,
  secure,
}: {
  label: string;
  placeholder: string;
  type: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  value?: string;
  id: string;
  secure?: Array<{ calculate: boolean; type: string }>;
}) => {
  const { t } = useTranslation();

  // Usar useState para manejar el estado del valor del input si es necesario
  const [inputValue, setInputValue] = useState(value || '');

  // Función para manejar cambios en el input, actualiza el estado local y llama a onChange prop si está disponible
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue); // Llamar a la función onChange prop con el nuevo valor
    }
  };

  return (
    <>
      <SelectContainer>
        <BackgroundLabelContainer>
          <LabelContainer id={id}>{label}</LabelContainer>
        </BackgroundLabelContainer>
        <ContainerInput
          as="input" // Transformar el ContainerInput en un input real
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue} // Usar el estado local inputValue como valor del input
          onChange={handleInputChange} // Asignar la función de manejo de cambio
          // Añadir estilos adicionales si se requiere
          style={{
            cursor: 'text', // Cambiar el cursor a tipo texto
            justifyContent: 'flex-start', // Alinear el texto al inicio
          }}
        />
      </SelectContainer>
      <SecureContainer style={{ height: `${secure && secure.length * 1.2}rem` }}>
        {secure && secure.length > 0 ? (
          <>
            <br />
            {[...secure]
              ?.filter((e) => !e.calculate)
              .map((e) => (
                <div style={{ width: '100%' }} key={e.type}>
                  <SecureText>{e.type}</SecureText>
                </div>
              ))}
          </>
        ) : null}
      </SecureContainer>
    </>
  );
};
