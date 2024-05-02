import { setLocalWifiParams } from '@/hooks/useLuciRCPjsonClient/fetchCalls/setWifiParams';
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
} from '.';
import { TopologyData } from '../../types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';

// Componente del formulario
export const SettingForm = ({ topologyData }: { topologyData: TopologyData }) => {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [edit, setEdit] = useState(false);

  const [values, setValues] = useState({
    ssid: topologyData.yourRouter.configs?.configFile?.ap?.ssid ?? '',
    password: topologyData.yourRouter.configs?.configFile?.ap?.key ?? '',
  });

  const [tempValues, setTempValues] = useState(values);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSave = async () => {
    setValues(tempValues);
    setEdit(false);

    const response = await setLocalWifiParams({
      sid: topologyData.yourRouter.sid,
      params: {
        ssid: tempValues.ssid,
        key: tempValues.password,
      },
    });

    console.log('Saved!', response);
  };

  useEffect(() => {
    if (!edit) {
      setTempValues(values);
    }
    // console.log('values', values);
  }, [values]);

  useEffect(() => {
    // console.log('topologyData.yourRouter.configs', topologyData.yourRouter.configs);
    setValues({
      ssid: topologyData.yourRouter.configs?.configFile?.ap?.ssid ?? '',
      password: topologyData.yourRouter.configs?.configFile?.ap?.key ?? '',
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
        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          {t('common_offline_wireless_settings')}
        </div>
      </div>
      <br />
      <Form onSubmit={onSave}>
        <FormGroup>
          <Label htmlFor="ssid">
            {t('common_local_access_point')}
            <br />
          </Label>
          <Input
            id="offline-ssid"
            type="text"
            value={tempValues.ssid}
            onChange={(e) => {
              setTempValues({ ...tempValues, ssid: e.target.value });
              setEdit(true);
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">{t('common_password')}:</Label>
          <PasswordInputWrapper>
            <InputPassword
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={tempValues.password}
              onChange={(e) => {
                setTempValues({ ...tempValues, password: e.target.value });
                setEdit(true);
              }}
            />
            <EyeIcon onClick={togglePasswordVisibility}>
              {!isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />} {/* Aquí puedes usar un ícono real */}
            </EyeIcon>
          </PasswordInputWrapper>
        </FormGroup>
      </Form>

      <ContainerSaveButton>
        <SaveButton
          onClick={() => {
            setEdit(false);
            setTempValues(values);
          }}
          disabled={!edit}
        >
          {t('common_cancel')}
        </SaveButton>

        <SaveButton onClick={onSave} disabled={!edit}>
          {t('common_save')}
        </SaveButton>
      </ContainerSaveButton>
    </>
  );
};
