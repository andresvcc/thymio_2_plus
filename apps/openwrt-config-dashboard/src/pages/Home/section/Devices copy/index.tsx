/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { SimpleGridLayout, Layout } from 'mobsya-theme';

import StorageIcon from '@mui/icons-material/Storage';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import styled from 'styled-components';
import { Icon } from 'mobsya-theme';
import { TopologyData } from '../../types';

type values = {
  label: string;
  value: React.ReactNode;
};

type PropsInfoCard = {
  title?: string;
  info?: values[];
  icon?: React.ReactNode;
};

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #f1effa;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 0.5rem 0rem 0.5rem 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0rem;
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
`;

const IconContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 30%;
  transform: scale(1);
`;

const TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 36%;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8rem;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

const InfoRowContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 1rem);
  padding-right: 1rem;
`;

const ValueContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 55%;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  font-weight: lighter;
  text-align: right;
`;

const LabelContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7rem;
  font-weight: bold;
`;

const WhiteDivider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: calc(100% - 1rem);
  height: 1px;
  background: #fff;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

const InfoCard = ({ icon, title, info = [] }: PropsInfoCard) => {
  return (
    <Card>
      <IconContent>{icon}</IconContent>
      <InfoContent>
        <TitleContent>{title}</TitleContent>
        <InfoRowContent>
          <LabelContent>{info[0]?.label}</LabelContent>
          <ValueContent>{info[0]?.value}</ValueContent>
        </InfoRowContent>
        <WhiteDivider />
        <InfoRowContent>
          <LabelContent>{info[1]?.label}</LabelContent>
          <ValueContent>{info[1]?.value}</ValueContent>
        </InfoRowContent>
      </InfoContent>
    </Card>
  );
};

interface TableColumn {
  key: string; // Clave única para cada columna
  label: string; // Texto que se mostrará en el encabezado de la columna
  render: (value: any) => React.ReactNode; // Función que recibe el valor de la celda y retorna el contenido de la celda
}

interface TableData {
  [key: string]: any; // Clave de acuerdo con TableColumn.key y su valor correspondiente
}

interface TableProps {
  columns: TableColumn[];
  data: TableData[];
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0.5rem;
`;

const StyledHead = styled.thead`
  background-color: #f5f5f5;
  font-size: 0.9rem;
`;

const StyledHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
`;

const StyledBody = styled.tbody``;

const StyledRow = styled.tr`
  &:nth-child(odd) {
    background-color: #fafafa;
  }
`;

const StyledCell = styled.td<{ columnLabel: string; active: string }>`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.9rem;
  background-color: ${({ columnLabel, active }) =>
    columnLabel === '' ? 'transparent' : active ? '#e6ffe2' : '#f5f5f5'};
`;

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <StyledTable>
      <StyledHead>
        <tr>
          {columns.map((column, index) => (
            <StyledHeaderCell key={`${column.key}-${index}`}>{column.label}</StyledHeaderCell>
          ))}
        </tr>
      </StyledHead>
      <StyledBody>
        {data.map((row, rowIndex) => (
          <StyledRow key={`row-${rowIndex}`}>
            {columns.map((column, colIndex) => (
              <StyledCell key={`cell-${rowIndex}-${colIndex}`} columnLabel={column.label} active={row.active}>
                {column.render(row[column.key])}
              </StyledCell>
            ))}
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  );
};

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
          'devices-lengend': () => (
            <div style={{ width: '100%', height: '100%', padding: '1rem' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Devices Status</div>
              {[
                `Everything looks good! Your network is ${
                  topologyData.isConnectedToInternet ? 'online' : 'offline'
                } and Thymio wireless point is connected ${topologyData.yourRouter.devices.length} devices`,
              ].map((text, index) => (
                <div key={index} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  {text}
                </div>
              ))}
            </div>
          ),
          'devices-status': () => (
            <InfoCard
              icon={<Icon name="devices" sizeW="2.2rem" sizeH="2.2rem" palleteFill={['#777']} />}
              title="Devices status"
              info={[
                {
                  label: 'Connected devices:',
                  value: (
                    <div style={{ fontWeight: 'bolder', width: '100%' }}>{topologyData.yourRouter.devices.length}</div>
                  ),
                },
                {
                  label: 'Discoverable devices:',
                  value: <div style={{ fontWeight: 'bolder', width: '100%' }}>0</div>,
                },
              ]}
            />
          ),
          'devices-table': () => (
            <Table
              columns={[
                { key: 'id', label: 'Device name', render: (value) => value },
                {
                  key: 'active',
                  label: 'Status',
                  render: (value) => (value ? 'Connected to wireless point' : 'Discoverable by wireless point'),
                },
                { key: 'ip', label: 'IP', render: (value) => value },
                { key: 'mac', label: 'MAC', render: (value) => value },
              ]}
              data={topologyData.yourRouter.devices}
            />
          ),
          'devices-table-mobile': () => (
            <Table
              columns={[
                { key: 'id', label: 'Device name', render: (value) => value },
                {
                  key: 'active',
                  label: 'Status',
                  render: (value) => (value ? 'Connected' : 'Discoverable'),
                },
                { key: 'ip', label: 'IP', render: (value) => value },
              ]}
              data={topologyData.yourRouter.devices}
            />
          ),
          'internet-status': () => (
            <InfoCard
              icon={<Icon name="internet" sizeW="2.2rem" sizeH="2.2rem" palleteFill={['#777']} />}
              title="Internet status"
              info={[
                {
                  label: 'Connection status',
                  value: (
                    <div
                      style={{
                        color: topologyData.isConnectedToInternet ? '#68BC5A' : '#777',
                        fontWeight: 'bolder',
                        width: '100%',
                      }}
                    >
                      {topologyData.isConnectedToInternet ? 'Connected' : 'Disconnected'}
                    </div>
                  ),
                },
                topologyData.isConnectedToInternet
                  ? {
                      label: 'Uptime',
                      value: <div style={{ fontWeight: 'bolder', width: '100%' }}>{timeAgoString}</div>,
                    }
                  : {
                      label: 'Last connection',
                      value: <div style={{ fontWeight: 'bolder', width: '100%' }}>{timeAgoString}</div>,
                    },
              ]}
            />
          ),
          'data-ussage': () => (
            <InfoCard
              icon={<StorageIcon style={{ color: '#777', width: '2.2rem', height: '2.2rem' }} />}
              title="Data Usage"
              info={[
                {
                  label: 'Downloaded:',
                  value: (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}
                    >
                      <ArrowDownwardIcon
                        style={{
                          color: '#68BC5A',
                          width: '1.1rem',
                          height: '1.1rem',
                          transform: 'translateY(0.1rem)',
                        }}
                      />
                      <div style={{ color: '#777', fontWeight: 'bolder' }}>
                        {fromBytes(topologyData.yourRouter.wlanInfo.dataTransfert.tx?.bytes ?? 0)}
                      </div>
                    </div>
                  ),
                },
                {
                  label: 'Uploaded:',
                  value: (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}
                    >
                      <ArrowUpwardIcon
                        style={{
                          color: '#68BC5A',
                          width: '1.1rem',
                          height: '1.1rem',
                          transform: 'translateY(0.15rem)',
                        }}
                      />
                      <div style={{ color: '#777', fontWeight: 'bolder' }}>
                        {fromBytes(topologyData.yourRouter.wlanInfo.dataTransfert.rx.bytes)}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          ),
        }}
      />
    </div>
  );
};

export default DevicesPage;
