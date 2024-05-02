import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 0.8rem;
  margin: auto;
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  color: orange;
  justify-self: start;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:hover {
    border-color: #888;
  }
  &:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

export const InputPassword = styled.input`
  padding: 10px;
  padding-right: 40px; /* Aumenta el espacio a la derecha para el ícono */
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Asegúrate de que el input se extienda completamente dentro del wrapper */

  &:hover {
    border-color: #888;
  }

  &:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
  }
`;

export const SaveButton = styled.button`
  background-color: #452ab6;
  color: white;
  padding: 10px 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #5e35b1; // Un tono más claro de naranja
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
      0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  &:active {
    background-color: #311b92; // Un tono más oscuro de naranja
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
      0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  &:disabled {
    background-color: #cccccc80;
    color: #aaa;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ScannButton = styled.button`
  background-color: #452ab6;
  color: white;
  padding: 10px 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #5e35b1; // Un tono más claro de naranja
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
      0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  &:active {
    background-color: #311b92; // Un tono más oscuro de naranja
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
      0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  &:disabled {
    background-color: #cccccc80;
    color: #aaa;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ContainerSaveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2rem;
  padding: 0.5rem 0.8rem;
  width: calc(100% - 1.3rem);
  gap: 10px; /* Añade un espacio entre los componentes */
`;
