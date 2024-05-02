/* eslint-disable react/no-unstable-nested-components */
import {
  BackgroundMenuContainer,
  BodyContainer,
  BoxMenuContainer,
  Divider,
  HeadContainer,
  HoverableCellTowerIcon,
  HoverableHomeIcon,
  HoverableSettingsIcon,
  MenuContainer,
  MenuMobileContainer,
  MobileTopHeadContainer,
  OptionsMenuContainer,
  StyledMenuItem,
  StyledTypography,
  Title,
  TitleContainer,
  TopHeadContainer,
} from './styles';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDataState } from '@/hooks/useLuciRCPjsonClient/stateMachine';
import { Icon, SimpleGridLayout } from 'mobsya-theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionsLayout } from './layout';
import Pages from '../../pages/Home';

interface ButtonMenuProps {
  icon?: React.ReactNode;
  name: string;
  iconName?: string;
  selected?: boolean;
  onSelect?: (name: string) => void;
}

const ButtonMenu: React.FC<ButtonMenuProps> = ({ icon, name, selected, onSelect = () => true }) => {
  return (
    <StyledMenuItem selected={selected} onClick={() => onSelect(name)}>
      {icon}
      <StyledTypography>{name}</StyledTypography>
    </StyledMenuItem>
  );
};

const ButtonMenuWidthIcon: React.FC<ButtonMenuProps> = ({ iconName, name, selected, onSelect = () => true }) => {
  const [hover, setHover] = useState(false);

  return (
    <StyledMenuItem
      selected={selected}
      onClick={() => onSelect(name)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Icon
        name={iconName ?? ''}
        sizeW="2rem"
        sizeH="2rem"
        style={{ paddingRight: '0.6rem' }}
        palleteFill={[hover || selected ? '#f47715' : '#757b84']}
      />
      <StyledTypography>{name}</StyledTypography>
    </StyledMenuItem>
  );
};

const icons: { [key: string]: React.ReactNode } = {
  Home: <HoverableHomeIcon style={{ marginRight: '0.5rem' }} />,
  Network: <HoverableCellTowerIcon style={{ marginRight: '0.5rem' }} />,
  Settings: <HoverableSettingsIcon style={{ marginRight: '0.5rem' }} />,
  Devices: (
    <Icon name="devices" sizeW="1.6rem" sizeH="1.6rem" style={{ paddingRight: '0.6rem' }} palleteFill={['#757b84']} />
  ),
  Thymios: (
    <Icon
      name="thymioSide"
      sizeW="2rem"
      sizeH="2rem"
      style={{ paddingRight: '0.6rem', transform: 'translateY(0.2rem)' }}
      palleteFill={['#757b84']}
    />
  ),
};

const extractIPAddress = (ipMask: string) => {
  const parts = ipMask.split('/');
  if (parts.length > 0) {
    return parts[0];
  }
  return null; // Devuelve null si no se puede extraer la dirección IP
};

export const Sections = () => {
  const { t } = useTranslation();
  const { devices, wlanInfo, robots, sid, configs, ifStatus, isConnectedToInternet, cycle } = useDataState();
  const [isOpen, setIsOpen] = useState(false);

  const routerData = {
    sid,
    devices,
    configs,
    isConnectedToInternet: isConnectedToInternet,
    lastConnection: wlanInfo.lastConnection,
    wlanInfo,
    ifStatus,
    robots: robots.filter((robot) => robot.status !== 'disconnected'),
    cycle,
  };

  const [selected, setSelected] = useLocalStorage<string>('section', t('menu_dashboard_home'));

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <BackgroundMenuContainer isOpen={isOpen} onClick={() => setIsOpen(false)}>
        <MenuMobileContainer isOpen={isOpen}>
          <OptionsMenuContainer>
            <Divider />
            <ButtonMenu
              onSelect={setSelected}
              selected={selected === t('menu_dashboard_home')}
              icon={<HoverableHomeIcon />}
              name={t('menu_dashboard_home')}
            />
            <Divider />
            <ButtonMenu
              onSelect={setSelected}
              selected={selected === t('menu_dashboard_network')}
              icon={<HoverableCellTowerIcon />}
              name={t('menu_dashboard_network')}
            />
            <Divider />
            <ButtonMenuWidthIcon
              onSelect={setSelected}
              selected={selected === t('menu_dashboard_devices')}
              name={t('menu_dashboard_devices')}
              iconName="devices"
            />
            <Divider />
            <ButtonMenuWidthIcon
              onSelect={setSelected}
              selected={selected === t('menu_dashboard_thtymios')}
              name={t('menu_dashboard_thtymios')}
              iconName="thymioSide"
            />
            <Divider />
            <ButtonMenu
              onSelect={() => {
                // console.log('Settings');
                window.open(`http://${extractIPAddress(ifStatus.route[0].source)}/cgi-bin/luci`, '_blank');
              }}
              selected={selected === t('menu_dashboard_settings')}
              icon={<HoverableSettingsIcon />}
              name={t('menu_dashboard_settings')}
            />
            <Divider />
          </OptionsMenuContainer>
        </MenuMobileContainer>
      </BackgroundMenuContainer>
      <SimpleGridLayout
        layout={SectionsLayout}
        items={{
          head: () => {
            return (
              <HeadContainer>
                <TitleContainer>
                  {icons[selected]}
                  <Title>{selected}</Title>
                </TitleContainer>
              </HeadContainer>
            );
          },
          topHead: () => {
            return (
              <TopHeadContainer>
                <Icon name="logoThymioByMobsya" rotate={0} sizeH={45} sizeW={110} />
              </TopHeadContainer>
            );
          },
          mobileTopHead: () => {
            return (
              <MobileTopHeadContainer>
                <Icon name="menu" rotate={0} sizeH={25} sizeW={45} onClick={openMenu} />
                <Icon name="logoThymioByMobsya" rotate={0} sizeH={45} sizeW={110} />
                <div style={{ width: '3rem' }} />
              </MobileTopHeadContainer>
            );
          },
          menu: () => {
            return (
              <MenuContainer>
                <BoxMenuContainer>
                  <Icon
                    name="logoThymioByMobsya"
                    rotate={0}
                    sizeH={45}
                    sizeW={110}
                    palleteFill={['#452AB6', '#F57715']}
                    palleteFillHover={['#452AB6AA', '#F57715AA']}
                  />
                  <OptionsMenuContainer>
                    <Divider />
                    <ButtonMenu
                      onSelect={setSelected}
                      selected={selected === t('menu_dashboard_home')}
                      icon={<HoverableHomeIcon />}
                      name={t('menu_dashboard_home')}
                    />
                    <Divider />
                    <ButtonMenu
                      onSelect={setSelected}
                      selected={selected === t('menu_dashboard_network')}
                      icon={<HoverableCellTowerIcon />}
                      name={t('menu_dashboard_network')}
                    />
                    <Divider />
                    <ButtonMenuWidthIcon
                      onSelect={setSelected}
                      selected={selected === t('menu_dashboard_devices')}
                      name={t('menu_dashboard_devices')}
                      iconName="devices"
                    />
                    <Divider />
                    <ButtonMenuWidthIcon
                      onSelect={setSelected}
                      selected={selected === t('menu_dashboard_thtymios')}
                      name={t('menu_dashboard_thtymios')}
                      iconName="thymioSide"
                    />
                    <Divider />
                    <ButtonMenu
                      onSelect={() => {
                        // console.log('Settings');
                        window.open(`http://${extractIPAddress(ifStatus.route[0].source)}/cgi-bin/luci`, '_blank');
                      }}
                      selected={selected === t('menu_dashboard_settings')}
                      icon={<HoverableSettingsIcon />}
                      name={t('menu_dashboard_settings')}
                    />
                    <Divider />
                  </OptionsMenuContainer>
                </BoxMenuContainer>
              </MenuContainer>
            );
          },
          body: () => {
            return (
              <BodyContainer>
                <Pages selected={selected} routerData={routerData} />
              </BodyContainer>
            );
          },
        }}
      />
    </>
  );
};
