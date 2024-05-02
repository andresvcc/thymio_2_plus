import styled from 'styled-components';

export const ContainerInput = styled.div`
  width: 100%;
  padding: 10px 15px;
  border-radius: 0.25rem;
  border: 1px solid #f57715;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  appearance: none; // Esto elimina el aspecto predeterminado del select
  background-color: white;
  cursor: pointer;
  max-width: 400px;
  height: 1.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 0.9rem;
  color: #505050;
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: #f57715;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
  max-height: 70vh; // Limita la altura máxima para asegurar que el modal sea desplazable
  display: flex;
  flex-direction: column;
  overflow-y: auto; // Habilita el desplazamiento vertical cuando el contenido excede la altura máxima
  position: relative;
`;

export const LanguageOption = styled.button`
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 1.2rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const LabelContainer = styled.div`
  margin-bottom: 10px;
  transform: translate(0px, -8px);
  width: max-content;
  font-size: 0.9rem;
  color: #f57715;
`;

export const BackgroundLabelContainer = styled.div`
  margin-bottom: 10px;
  transform: translate(5px, 19px);
  width: max-content;
  padding: 0 5px;
  background-color: white;
  height: 10px;
`;

export const SelectContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const SecureText = styled.div`
  font-size: 1rem;
  color: #ff0000;

  @media (max-width: 800px) {
    font-size: 0.7rem;
  }
`;
