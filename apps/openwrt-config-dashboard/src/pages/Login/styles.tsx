import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 3rem);
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const LoginForm = styled.form`
  position: relative;
  transform: translateY(-100px);
  zindex: 2;
  background-color: #ffffff; /* Fondo blanco */
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  max-width: 350px;
  min-width: 250px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333; /* Texto gris oscuro */
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: calc(100% - 40px);
  margin-bottom: 20px;
  padding: 12px 15px;
  border: 1px solid #ddd; /* Borde gris claro */
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f57715; /* Color azul característico de Apple */
  border: none;
  border-radius: 5px;
  color: #fff; /* Texto blanco */
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #452AB6"; /* Color azul oscuro en hover */
  }
`;

export const FormContinaer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

export const IconContainer = styled.div`
  transform: scale(1.5) translateY(-40px);
  margin: 20px;
`;
