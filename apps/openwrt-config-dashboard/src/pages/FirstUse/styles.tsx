import { Button, Icon, Spinner, Typographie } from 'mobsya-theme';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const StyledPageContainer = styled.div`
  margin: 0;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4rem);
  width: calc(100% - 4rem);
  align-items: center;
  justify-content: flex-start;
  overflow-y: hidden;
`;

export const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dee5f1;
  background: linear-gradient(45deg, rgba(255, 255, 255, 1) 0%, rgba(222, 229, 241, 1) 75%);

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AbsoluteThymioIcon = styled(
  ({ rotate = 0, scale = 1, ...rest }: { x: number; y: number; scale?: number; rotate?: number }) => (
    <div {...rest}>
      <Icon name="thymioLeftSide" sizeH={200 * scale} sizeW={200 * scale} rotate={rotate} />
    </div>
  ),
)`
  z-index: -1;
  position: absolute;
  top: ${({ y, scale = 0 }) => y * (scale * 1.3)}vw;
  left: ${({ x, scale = 0 }) => x * (scale * 1.3)}vh;
  opacity: 0.4;
  transform: scale(${({ scale }) => scale}) translate(-1vw, calc(10vh - 10vw)) rotate(${({ rotate }) => rotate}deg);
  display: flex;

  @media (max-height: 1480px) {
    transform: scale(0.8) translate(-2vw, 20vh);
  }

  @media (max-height: 980px) {
    transform: scale(0.6) translate(-50px, 25vh);
  }

  @media (max-height: 700px) {
    transform: scale(0.6) translate(0px, 25vh);
    top: ${({ y, scale = 0 }) => y * (scale * 1.2)}vw;
    left: ${({ x, scale = 0 }) => x * (scale * 1.2)}vh;
  }

  @media (max-height: 650px) {
    display: none;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

export const HeaderContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% * 0.9);
  max-width: 1600px;
  padding-left: 0.5rem;

  @media (max-width: 4900px) {
    width: calc(100% - 2rem);
    max-width: 50vw;
  }

  @media (max-width: 1900px) {
    width: calc(100% - 2rem);
    max-width: 90vw;
  }

  @media (max-width: 1600px) {
    width: calc(100% - 2rem);
    padding-left: 1rem;
  }

  @media (max-width: 800px) {
    padding-left: 0rem;
    margin-top: 2rem;
    flex-direction: column;
    width: calc(100% - 1rem);

    // Estilos específicos para cambiar el orden cuando se apilan
    & > :first-child {
      order: 2;
    }

    & > :last-child {
      order: 1;
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: auto;
  max-width: 800px;
  padding-top: 4rem;

  @media (max-width: 800px) {
    padding-top: 0rem;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1.3);

  @media (max-width: 800px) {
    padding-top: 0rem;
    transform: scale(1.2);
    margin-bottom: 1rem;
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 35vh;
  max-width: 80vw;
  width: 100%;
`;

export const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 80vw;
  height: 50vh;
  width: 100%;

  @media (max-width: 800px) {
    height: 40vh;
  }
`;

export const WifiListFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-width: 80vw;
  height: 40vh;
  width: 100%;

  @media (max-width: 800px) {
    height: 40vh;
  }
`;

export const SecureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 4rem;
  width: calc(100% - 3rem);
  max-width: 450px;

  @media (max-width: 800px) {
    padding-left: 0rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    transform: translateX(-1rem);
    max-width: calc(100% - 2rem);
  }
`;

const SecureText = styled.div`
  font-size: 1rem;
  color: #ff0000;

  @media (max-width: 800px) {
    font-size: 0.7rem;
  }
`;

export const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  max-width: 680px;
  transform: translateX(-30px);

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: calc(100% - 0.2rem);
    transform: translateX(0.2rem);
  }
`;

export const RowFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: 2rem;
  max-width: 80vw;
  transform: scale(0.8);
  position: relative;
  z-index: -1;

  @media (max-width: 4900px) {
    transform: scale(0.8);
  }

  @media (max-width: 1900px) {
    transform: scale(1);
    max-width: 1900px;
  }

  @media (max-width: 1600px) {
    transform: scale(1.1);
    max-width: 1600px;
  }

  @media (max-width: 1200px) {
    transform: scale(1.4);
  }

  @media (max-width: 800px) {
    transform: scale(1.2);
  }

  @media (min-height: 500px) {
    padding-top: 1rem;
  }

  @media (min-height: 750px) {
    padding-top: calc(2vh + 2rem);
  }

  @media (min-height: 1024px) {
    padding-top: calc(8vh - 5rem);
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 4rem;
  width: calc(100vw - 10rem);
  max-width: 1600px;

  @media (max-width: 4900px) {
    width: calc(100% - 2rem);
    max-width: 60vw;
  }

  @media (max-width: 1900px) {
    width: calc(100% - 2rem);
    max-width: 90vw;
  }

  @media (max-width: 1600px) {
    width: 50vw;
    right: 2rem;
  }

  @media (max-width: 800px) {
    justify-content: center;
    width: calc(100vw - 4rem);
    right: 0rem;
    padding: 2rem;
    bottom: 0px;
    z-index: -1;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 12rem;
  max-width: 300px;

  @media (max-width: 800px) {
    width: calc(100% - 8rem);
  }
`;

export const ButtonAndSkipContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 800px) {
    width: calc(100% - 4rem);
    padding-left: 0rem;
    justify-content: flex-start;
  }
`;

export const TypographieFuseButton = styled(Typographie)`
  font-size: 1.2rem;

  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

export const Title = styled(Typographie)`
  font-size: 2.3rem;
  font-weight: 600;

  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

export const Input = styled.input`
  border: 1px solid #f57715;
  border-radius: 4px;
  padding: 0.8rem;
  padding-right: 3rem; /* Espacio adicional para el ícono */
  font-size: 1.1rem;
  font-weight: 100;
  font-style: italic;
  width: calc(100% - 3rem);
  max-width: 300px;
  outline: none;
  transition: all 0.2s ease-in-out;
  color: #808080;

  &::placeholder {
    color: #808080;
    opacity: 0.9;
    font-weight: 100;
    font-style: italic;
    font-size: 0.9rem;
  }

  &:focus {
    border: 1px solid #f57715aa;
  }

  @media (max-width: 800px) {
    max-width: calc(100% - 7rem);
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0.3rem 0;
`;

export const IconShow = styled.span`
  position: absolute;
  right: 3.5rem;
  top: calc(25%);
  cursor: pointer;
`;

export const IconShowModal = styled.span`
  position: absolute;
  right: -0.5rem;
  top: calc(25%);
  cursor: pointer;

  @media (max-width: 800px) {
    right: 3.5rem;
  }
`;

export const InputPassword = ({
  placeholder,
  onChange,
  disabled,
  value,
  id,
}: {
  placeholder: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  value?: string;
  id: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (password && onChange) {
      onChange(password);
    }
  }, [password]);

  return (
    <InputContainer>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        onChange={(evt) => setPassword(evt.target.value)}
        disabled={disabled}
        value={value}
      />
      {password && (
        <IconShow onClick={togglePasswordVisibility}>
          <Icon name="showPassword" sizeH={25} sizeW={25} palleteFill={showPassword ? ['#ababab'] : ['#ababab70']} />
        </IconShow>
      )}
    </InputContainer>
  );
};

export const InputPasswordModal = ({
  placeholder,
  onChange,
  disabled,
  value,
  id,
}: {
  placeholder: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  value?: string;
  id: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (password && onChange) {
      onChange(password);
    }
  }, [password]);

  return (
    <InputContainer>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        onChange={(evt) => setPassword(evt.target.value)}
        disabled={disabled}
        value={value}
      />
      {password && (
        <IconShowModal onClick={togglePasswordVisibility}>
          <Icon name="showPassword" sizeH={25} sizeW={25} palleteFill={showPassword ? ['#ababab'] : ['#ababab70']} />
        </IconShowModal>
      )}
    </InputContainer>
  );
};

export const InputText = ({
  placeholder,
  onChange,
  disabled,
  value,
  id,
}: {
  placeholder: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  id: string;
}) => {
  const [input, setInput] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (input && onChange) {
      onChange(input);
    }
  }, [input]);

  return (
    <InputContainer>
      <Input
        id={id}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(evt) => setInput(evt.target.value)}
        disabled={disabled}
      />
    </InputContainer>
  );
};

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  color: purple;
`;

// Estilos para las líneas divisoras
const DividerLine = styled.div`
  height: 2px;
  flex: 1;
  background-color: white;
  width: 100px;
`;

export const DividerWithText = () => {
  return (
    <DividerContainer>
      <DividerLine />
      <Typographie variant="paragraph" size="3rem" style={{ padding: '0.5rem' }} color="#452AB6">
        Or
      </Typographie>
      <DividerLine />
    </DividerContainer>
  );
};

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex: 0.5;
  padding-right: 0.5rem;
  width: 35rem;
  max-width: 300px;

  @media (max-width: 800px) {
    padding-right: 0rem;
    width: calc(100vw - 5rem);
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 0rem;
  }
`;

export const InputBox = ({
  label,
  placeholder,
  type,
  onChange,
  disabled,
  secure,
  value,
  id,
}: {
  label: string;
  placeholder: string;
  type: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  secure?: Array<{ calculate: boolean; type: string }>;
  value?: string;
  id: string;
}) => {
  return (
    <>
      <RowContainer>
        <LabelContainer>
          <Typographie variant="paragraph" color="#F57715" size="1rem">
            {label}
          </Typographie>
        </LabelContainer>
        {type === 'text' ? (
          <InputText id={id} value={value} placeholder={placeholder} onChange={onChange} disabled={!!disabled} />
        ) : (
          <InputPassword id={id} value={value} placeholder={placeholder} onChange={onChange} disabled={!!disabled} />
        )}
      </RowContainer>
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

export const InputBoxModal = ({
  label,
  placeholder,
  type,
  onChange,
  id,
}: {
  label: string;
  placeholder: string;
  type: string;
  onChange?: (value: string) => void;
  id: string;
}) => {
  return (
    <ModalInputContainer>
      <LabelContainer>
        <Typographie
          variant="paragraph"
          color="#F57715"
          style={{ fontWeight: '300', paddingRight: '2rem' }}
          size="1.3rem"
        >
          {label}
        </Typographie>
        {type === 'text' ? (
          <InputText id={id} placeholder={placeholder} onChange={onChange} />
        ) : (
          <InputPasswordModal id={id} placeholder={placeholder} onChange={onChange} />
        )}
      </LabelContainer>
    </ModalInputContainer>
  );
};

const WifiContainerBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;

  @media (max-width: 800px) {
    margin-top: 1rem;
  }
`;

const WifiLabelContainer = styled.div`
  width: 100%; // Ancho completo
  max-width: 820px; // Ancho máximo
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
`;

const WifiListContainer = styled.div`
  max-height: 40vh; // Altura máxima antes de mostrar el scrollbar
  overflow-y: auto; // Muestra un scrollbar vertical si es necesario
  border: 2px solid #f57715; // Borde ligero
  border-radius: 8px; // Bordes redondeados
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Sombra ligera para profundidad
  padding: 10px; // Espaciado interno
  background-color: #fff; // Fondo blanco
  width: 100%; // Ancho completo
  max-width: 800px; // Ancho máximo
  box-sizing: border-box; // Asegura que el padding no afecte el ancho total

  @media (max-width: 800px) {
    max-height: 35vh;
  }
`;

const WifiItem = styled.div`
  padding: 0.25rem; // Espaciado interno para cada elemento
  border-bottom: 0.5px solid #eee; // Separador entre elementos
  background-color: #fff; // Fondo blanco
  display: flex; // Flexbox para alinear elementos
  justify-content: space-between; // Alinear elementos a los extremos
  align-items: center; // Alinear elementos verticalmente
  flex-direction: row; // Alinear elementos horizontalmente

  &:last-child {
    border-bottom: none; // Elimina el borde del último elemento
  }

  &:hover {
    background-color: #f9f9f9; // Efecto hover sutil
  }
`;

const WifiName = styled.span`
  font-weight: lighter; // Fuente ligera
  display: flex; // Flexbox para alinear elementos
  align-items: center; // Alinear elementos verticalmente
  flex-direction: row; // Alinear elementos horizontalmente
  justify-content: flex-start; // Alinear elementos a la izquierda
`;

const SecurityType = styled.span`
  float: right; // Tipo de seguridad a la derecha
  color: #666; // Color gris para el tipo de seguridad
`;

const WifiListTitle = styled(Typographie)`
  font-size: 1rem;
  margin-left: 0.8rem;

  @media (max-width: 800px) {
    font-size: 0.8rem;
    margin-left: 0.2rem;
  }
`;

const ModalTitle = styled(Typographie)`
  font-size: 1.4rem;

  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

const ModalDescription = styled(Typographie)`
  font-size: 1rem;
`;

const ModalContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s;
  width: 100%;
  padding: 1rem;
  margin: 2rem;
  max-width: 370px;

  @media (max-width: 800px) {
    max-width: calc(100vw - 4rem);
    padding: 1rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ScreenModalBackground = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: #00000050;
  z-index: 99;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

const ModalTitleContainer = styled.div`
  width: 100%;
  padding: 2rem 0rem 3rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-aling: left;

  @media (max-width: 800px) {
    padding: 0rem 0rem 1rem 0rem;
  }
`;

const ModalInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    transform: translateX(1rem);
  }
`;

type Network = { ssid: string; security: string; signal: number };

type ModalProps = {
  show: boolean;
  onClose: () => void;
  network?: Network;
  onConnect?: ({
    ssid,
    username,
    password,
  }: {
    ssid: string;
    username: string;
    password: string;
    security: string;
  }) => void;
};

const Modal = ({ show = false, onClose, network, onConnect }: ModalProps) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (!network) {
    return null;
  }

  const onClickConnect = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (onConnect) {
      onConnect({ ssid: network.ssid, username: username, password: password, security: network.security });
    }
  };

  return (
    <ScreenModalBackground show={show}>
      <ModalContainer show={show}>
        <ModalTitleContainer>
          <ModalTitle variant="paragraph">{t('firsUse_st4_modal_title', { ssid: network.ssid })}</ModalTitle>
          <br />
          <ModalDescription size="1.2rem" variant="paragraph">
            {t('firsUse_st4_modal_description')}
          </ModalDescription>
        </ModalTitleContainer>
        <form
          onSubmit={onClickConnect}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {network?.security === 'wpa2' ? (
            <InputBoxModal
              id="username"
              type="text"
              label="Username"
              placeholder="Your Username"
              onChange={setUsername}
            />
          ) : null}
          <InputBoxModal
            id="password"
            type="password"
            label={t('firsUse_st4_password_label')}
            placeholder={t('firsUse_st4_password_placeholder')}
            onChange={setPassword}
          />
        </form>
        <ButtonAndSkipContainer style={{ width: '100%', paddingTop: '2rem' }}>
          <Button variant="text" size="large" textcolor="#452AB6">
            <Typographie
              variant="graphics"
              color="#452AB6"
              style={{ fontWeight: '600' }}
              size="1.2rem"
              onClick={onClose}
            >
              {t('common_cancel')}
            </Typographie>
          </Button>
          <Button variant="contained" size="large" bgcolor="#452AB6" onClick={onClickConnect}>
            <Typographie variant="graphics" color="#fff" style={{ fontWeight: '600' }} size="1.2rem">
              {t('common_connect')}
            </Typographie>
          </Button>
        </ButtonAndSkipContainer>
      </ModalContainer>
    </ScreenModalBackground>
  );
};

type WifiListProps = {
  networks: Network[];
  isScanning: boolean;
  onConnect?: ({
    ssid,
    username,
    password,
    security,
  }: {
    ssid: string;
    username: string;
    password: string;
    security: string;
  }) => void;
};

export const WifiList = ({ networks, onConnect, isScanning }: WifiListProps) => {
  const { t } = useTranslation();
  const [selectedNetwork, setSelectedNetwork] = useState<Network | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const handleNetworkClick = (network: Network) => {
    setSelectedNetwork(network);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNetwork(undefined);
  };

  return (
    <WifiContainerBox>
      <Modal show={showModal} onClose={handleCloseModal} network={selectedNetwork} onConnect={onConnect} />
      <WifiLabelContainer>
        <WifiListTitle variant="paragraph" color="#F57715" size="1.6rem">
          {t('firsUse_st4_wifi_label')}
        </WifiListTitle>
        <span>
          {isScanning ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                transform: 'translateY(-20px)',
              }}
            >
              <Icon
                name="router"
                palleteFill={['#4B4F54']}
                palleteFillHover={['#ababab']}
                rotate={0}
                sizeH={40}
                sizeW={95}
              />
              <Spinner color="#4B4F54" name="dots" size={80} speed={199} />
            </div>
          ) : (
            ''
          )}
        </span>
      </WifiLabelContainer>
      <WifiListContainer>
        {networks.map((network, index) => (
          <WifiItem key={index} onClick={() => handleNetworkClick(network)}>
            <WifiName>
              <Icon
                name="wireless"
                palleteFill={['#4B4F54']}
                palleteFillHover={['#ababab']}
                rotate={0}
                sizeH={25}
                sizeW={25}
                style={{ marginRight: '2rem' }}
              />
              <Typographie variant="paragraph" size="1rem">
                {network.ssid}
              </Typographie>
            </WifiName>

            <div>
              <SecurityType>{network.security}</SecurityType>
            </div>
          </WifiItem>
        ))}
      </WifiListContainer>
    </WifiContainerBox>
  );
};
