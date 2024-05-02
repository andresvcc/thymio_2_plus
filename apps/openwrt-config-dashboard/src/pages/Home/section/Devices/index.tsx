/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Layout, SimpleGridLayout } from 'mobsya-theme';
import styled from 'styled-components';
import { TopologyData } from '../../types';
import { DeviceLengend } from '../../components/infocards/devicesLengend';
import { InternetStatus } from '../../components/infocards/internetStatus';
import { DevicesStatusCard } from '../../components/infocards/devicesStatus';
import { DataUsageCard } from '../../components/infocards/dataUsage';
import { DeviceTableMobile } from '../../components/table/deviceTableMobile';
import { DeviceTable } from '../../components/table/deviceTable';

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 3.4rem;
  height: 1.5rem;
`;

const Slider = styled.span<{ active: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 1.5rem;

  &:before {
    position: absolute;
    content: '';
    height: 1.3rem;
    width: 1.3rem;
    left: 0.1rem;
    bottom: 0.1rem;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  span {
    position: absolute;
    color: white;
    font-size: 0.8rem;
    line-height: 1.3rem; // Ajustado para centrar verticalmente
    top: 50%;
    transition: opacity 0.4s;
  }

  .label {
    right: 0.4rem;
    transform: ${({ active }) =>
      active ? 'translateX(-1.5rem) translateY(-50%);' : 'translateX(0.15rem) translateY(-50%);'};
  }

  &:checked + & {
    .label {
      opacity: 0; // Ocultar OFF cuando está activado
    }
  }
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #68bc5a;
  }

  &:focus + ${Slider} {
    box-shadow: 0 0 1px #68bc5a;
  }

  &:checked + ${Slider}:before {
    transform: translateX(31px);
  }
`;

type SwitchProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
};

const Switch = ({ checked = false, onChange }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <SwitchContainer>
      <Checkbox type="checkbox" checked={isChecked} onChange={toggleSwitch} />
      <Slider active={isChecked}>
        <span className="label">{isChecked ? 'ON' : 'OFF'}</span>
      </Slider>
    </SwitchContainer>
  );
};

interface PagesProps {
  selected?: string;
}

const devicesLayout: Layout = {
  pc: [
    { i: 'devices-lengend', x: 0, y: 0, w: 12, h: 10, static: true },
    { i: 'devices-status', x: 0, y: 11, w: 3.6, h: 8, static: true },
    { i: 'internet-status', x: 3.9, y: 11, w: 3.6, h: 8, static: true },
    { i: 'data-ussage', x: 7.8, y: 11, w: 3.9, h: 8, static: true },
    { i: 'devices-table', x: 0, y: 30, w: 11.7, h: 48, static: true },
  ],
  tablet: [
    { i: 'devices-lengend', x: 0, y: 0, w: 12, h: 10, static: true },
    { i: 'devices-status', x: 0, y: 11, w: 3.6, h: 12, static: true },
    { i: 'internet-status', x: 3.9, y: 11, w: 3.6, h: 12, static: true },
    { i: 'data-ussage', x: 7.8, y: 11, w: 3.9, h: 12, static: true },
    { i: 'devices-table', x: 0, y: 30, w: 11.7, h: 48, static: true },
  ],
  mobile: [
    { i: 'devices-status', x: 0, y: 0, w: 11.2, h: 9, static: true },
    { i: 'data-ussage', x: 0, y: 12, w: 11.2, h: 9, static: true },
    { i: 'devices-lengend', x: 0, y: 23, w: 11.3, h: 8.5, static: true },
    { i: 'devices-table-mobile', x: 0, y: 35, w: 11.7, h: 48, static: true },
  ],
};

type Props = {
  topologyData: TopologyData;
};

function timeAgo(dateString: number) {
  const now = new Date();
  const date = new Date(now.getTime() - dateString * 1000);
  const timeDifference = now.getTime() - date.getTime();

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } else if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  } else {
    return 'more than a 30 days';
  }
}

function fromBytes(bytes = 0): string {
  const unidades = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let unidadIndex = 0;
  let tamaño = bytes;

  while (tamaño >= 1024 && unidadIndex < unidades.length - 1) {
    tamaño /= 1024;
    unidadIndex++;
  }

  // Formatear el tamaño con un máximo de un carácter decimal
  const tamañoFormateado = tamaño.toFixed(1);

  return `${tamañoFormateado} ${unidades[unidadIndex]}`;
}

const DevicesPage = ({ topologyData }: Props) => {
  const timeAgoString = timeAgo(topologyData.yourRouter.ifStatus.uptime);

  return (
    <div style={{ width: 'calc(100% - 1rem)', height: '100%' }}>
      <SimpleGridLayout
        breakpoints={{ pc: 1200, tablet: 768, mobile: 480 }}
        cols={{ pc: 12, portable: 12, tablet: 12, mobile: 12 }}
        layout={devicesLayout}
        margin={[1, 1]}
        items={{
          'devices-lengend': () => <DeviceLengend topologyData={topologyData} />,
          'devices-status': () => <DevicesStatusCard topologyData={topologyData} />,
          'devices-table': () => <DeviceTable topologyData={topologyData} />,
          'devices-table-mobile': () => <DeviceTableMobile topologyData={topologyData} />,
          'internet-status': () => <InternetStatus topologyData={topologyData} timeAgoString={timeAgoString} />,
          'data-ussage': () => <DataUsageCard topologyData={topologyData} />,
        }}
      />
    </div>
  );
};

export default DevicesPage;
