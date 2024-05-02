import { scannWifi, setExternalWifiParams, WifiNetwork } from '@/hooks/useLuciRCPjsonClient/fetchCalls/setWifiParams';
import React, { useEffect, useState } from 'react';
import {
  ContainerSaveButton,
  EyeIcon,
  Form,
  FormGroup,
  Input,
  InputPassword,
  Label,
  PasswordInputWrapper,
  SaveButton,
  ScannButton,
} from '.';
import { TopologyData } from '../../types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEmitter } from '@/hooks/useLuciRCPjsonClient/stateMachine';
import { AuthenticationSuite, dbmToSignalQuality, mapAuthSuiteToEncryption } from './mapAuthToEncryption';
import Modal from '@mui/material/Modal';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Icon, Spinner } from 'mobsya-theme';
import { Table } from '../table';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '1px solid #ababab',
  boxShadow: 24,
  p: 3,
};

export const SettingExternalWifiFormMobile = ({ topologyData }: { topologyData: TopologyData }) => {
  const { t } = useTranslation();
  const emit = useEmitter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [wizardStep, setWizardStep] = useState(1);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [edit, setEdit] = useState(false);

  const [values, setValues] = useState({
    ssid: topologyData.yourRouter.configs?.configFile?.sta?.ssid,
    username: '',
    password: '',
    securityType: '',
  });

  const [tempValues, setTempValues] = useState({
    ssid: topologyData.yourRouter.configs?.configFile?.sta?.ssid,
    username: '',
    password: '',
    securityType: '',
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSave = async () => {
    const response = await setExternalWifiParams({
      sid: topologyData.yourRouter.sid,
      params: {
        ssid: tempValues.ssid,
        password: tempValues.password,
        identity: tempValues.username,
        encryption: tempValues.securityType,
      },
    });

    setEdit(!edit);

    setValues({
      ssid: tempValues.ssid,
      username: '',
      password: '',
      securityType: tempValues.securityType,
    });

    emit({ event: 'UPDATE_DATA', data: {} });

    setWizardStep(1);
    setNetworks([]);
    handleClose();
  };

  const onSelect = (rowData: WifiNetwork) => {
    setTempValues({
      ssid: rowData.ssid,
      username: '',
      password: '',
      securityType: mapAuthSuiteToEncryption(rowData.authSuites as AuthenticationSuite),
    });
    setEdit(true);
    setWizardStep(2);
  };

  const onScann = async () => {
    handleOpen();
    const tempNetworks = await scannWifi({
      sid: topologyData.yourRouter.sid,
      client: topologyData.yourRouter.ifStatus.device === 'phy0-sta0',
    });

    // console.log('tempNetworks', tempNetworks);
    setNetworks(tempNetworks);
  };

  const onCancel = async () => {
    handleClose();
    setTempValues(values);
    setNetworks([]);
    setWizardStep(1);
  };

  useEffect(() => {
    if (!edit) {
      setTempValues(values);
    }
  }, [values]);

  useEffect(() => {
    // console.log('topologyData.yourRouter.configs', topologyData.yourRouter.configs?.configFile);
    setValues({
      ssid: topologyData.yourRouter.configs?.configFile?.sta?.ssid,
      username: '',
      password: '',
      securityType: '',
    });
  }, [topologyData.yourRouter.configs]);

  return (
    <>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginBottom: '0.1rem',
          padding: '0 0.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '1.8rem',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Online Wireless Settings</div>
      </div>
      <br />
      <Form onSubmit={onScann}>
        <FormGroup>
          <Label htmlFor="ssid">{t('common_online_wifi_ssid')}:</Label>
          <Input
            id="online-ssid"
            type="text"
            value={tempValues.ssid ?? ''}
            // onChange={(e) => setTempValues({ ...values, ssid: e.target.value })}
            disabled={true}
          />
        </FormGroup>
      </Form>

      <ContainerSaveButton>
        <ScannButton onClick={onScann}>{t('common_scan_wifi_networks')}</ScannButton>

        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h5" component="h2">
              {t('common_scanning_network')}
            </Typography>
            <Typography id="keep-mounted-modal-description" variant="subtitle2" sx={{ mt: 2 }}>
              {t('common_scanning_network_for_description')}
            </Typography>

            <div style={{ width: '100%', padding: '2rem 0rem', display: wizardStep !== 1 ? 'none' : 'block' }}>
              {networks.length === 0 ? (
                <>
                  <Icon
                    name="router"
                    palleteFill={['#4B4F54']}
                    palleteFillHover={['#ababab']}
                    rotate={0}
                    sizeH={140}
                    sizeW={250}
                  />
                  <Spinner color="#4B4F54" name="dots" size={200} speed={199} />
                </>
              ) : (
                <>
                  <Table
                    onClick={(rowData) => onSelect(rowData as WifiNetwork)}
                    columns={[
                      { key: 'ssid', label: 'Wifi Network', render: (value) => value },
                      { key: 'authSuites', label: 'Security', render: (value) => value },
                    ]}
                    data={networks
                      .filter(({ ssid }) => !ssid.includes('\\x00'))
                      .sort((a, b) => parseInt(b.signal, 10) - parseInt(a.signal, 10))}
                  />
                </>
              )}
            </div>

            <div
              style={{
                width: '100%',
                padding: '4rem 0rem',
                display: wizardStep !== 2 ? 'none' : 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Form onSubmit={onSave}>
                <FormGroup>
                  <Label htmlFor="sta-ssid">
                    SSID: <br />
                  </Label>
                  <Input
                    id="sta-online-ssid"
                    type="text"
                    value={tempValues.ssid}
                    // onChange={(e) => setTempValues({ ...tempValues, ssid: e.target.value })}
                    disabled={!edit}
                  />
                </FormGroup>

                {tempValues.securityType === 'psk3' ? (
                  <FormGroup>
                    <Label htmlFor="sta-username">{t('common_username')}:</Label>
                    <PasswordInputWrapper>
                      <InputPassword
                        id="sta-username"
                        type="text"
                        value={tempValues.username}
                        onChange={(e) => setTempValues({ ...tempValues, username: e.target.value })}
                        disabled={!edit}
                      />
                      <EyeIcon onClick={togglePasswordVisibility}>
                        {!isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}{' '}
                        {/* Aquí puedes usar un ícono real */}
                      </EyeIcon>
                    </PasswordInputWrapper>
                  </FormGroup>
                ) : null}

                <FormGroup>
                  <Label htmlFor="sta-password">{t('common_password')}:</Label>
                  <PasswordInputWrapper>
                    <InputPassword
                      id="sta-password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      value={tempValues.password}
                      onChange={(e) => setTempValues({ ...tempValues, password: e.target.value })}
                      disabled={!edit}
                    />
                    <EyeIcon onClick={togglePasswordVisibility}>
                      {!isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}{' '}
                      {/* Aquí puedes usar un ícono real */}
                    </EyeIcon>
                  </PasswordInputWrapper>
                </FormGroup>
              </Form>
            </div>

            <ContainerSaveButton>
              <SaveButton onClick={onCancel}>{t('common_cancel')}</SaveButton>

              <SaveButton onClick={onSave} disabled={!edit || wizardStep !== 2 || tempValues.password === ''}>
                {t('common_next')}
              </SaveButton>
            </ContainerSaveButton>
          </Box>
        </Modal>
      </ContainerSaveButton>
    </>
  );
};
