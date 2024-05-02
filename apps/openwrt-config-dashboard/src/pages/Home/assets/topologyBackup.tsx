import { Icon } from 'mobsya-theme';
import React from 'react';
import styled from 'styled-components';

// Tipos para los datos de la topología
type Device = {
  id: string;
};

type Robots = {
  id: string;
};

type Router = {
  id: string;
  devices: Device[];
  robots: Robots[];
};

type TopologyData = {
  isConnectedToInternet: boolean;
  isConnectedToMainRouter: boolean; // Nueva propiedad para la conexión entre tu router y el router principal
  mainRouter: Router;
  yourRouter: Router;
};

// Estilos para el contenedor SVG
const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;

  svg {
    width: 100%;
    height: 100%;
    max-height: 300px;
    max-width: 1600px;
  }
`;

// funcion para denterminar si un numero es par o no
const isPair = (num: number) => num % 2 === 0;

const NetworkTopology: React.FC<{ topologyData: TopologyData }> = ({ topologyData }) => {
  const internetPosition = { x: 100, y: 160 };
  const mainRouterPosition = { x: 250, y: 160 };
  const yourRouterPosition = { x: 450, y: 160 };

  const devicePositions = topologyData.yourRouter.devices.map((device, index, arr) => ({
    id: device.id,
    x: 480 + (index - Math.ceil(arr.length / 2) + (isPair(arr.length) ? 0.5 : 1)) * 60,
    y: 280,
  }));

  const robotsPositions = topologyData.yourRouter.robots.map((robot, index, arr) => ({
    id: robot.id,
    x: 480 + (index - Math.ceil(arr.length / 2) + (isPair(arr.length) ? 0.5 : 1)) * 60,
    y: 20,
  }));

  const lineStyle = {
    stroke: 'grey',
    strokeWidth: 1.5,
    strokeDasharray: '4, 2',
    opacity: topologyData.isConnectedToInternet ? 1 : 0.2,
  };

  const lineToRobotStyle = {
    stroke: 'grey',
    strokeWidth: 1,
    strokeDasharray: '4, 2',
    opacity: 1,
  };

  const lineToDeviceStyle = {
    stroke: 'grey',
    strokeWidth: 1,
    strokeDasharray: '4, 2',
    opacity: 1,
  };

  const lineToRouterStyle = {
    stroke: 'grey',
    strokeWidth: 1,
    strokeDasharray: '4, 2',
    opacity: topologyData.isConnectedToMainRouter ? 1 : 0.2,
  };

  const drawLines = () => {
    const lines = [];

    lines.push(
      <line
        key="line-internet-to-main"
        x1={internetPosition.x + 10}
        y1={internetPosition.y}
        x2={mainRouterPosition.x - 50}
        y2={mainRouterPosition.y}
        style={lineStyle}
      />,
    );

    lines.push(
      <line
        key="line-main-to-your"
        x1={mainRouterPosition.x + 30}
        y1={mainRouterPosition.y}
        x2={yourRouterPosition.x - 30}
        y2={yourRouterPosition.y}
        style={lineToRouterStyle}
      />,
    );

    devicePositions.forEach((device, index) => {
      lines.push(
        <line
          key={`line-your-to-device-${index}`}
          x1={yourRouterPosition.x + 25}
          y1={yourRouterPosition.y + 32}
          x2={device.x}
          y2={device.y - 30}
          style={lineToDeviceStyle}
        />,
      );
    });

    devicePositions.forEach((device, index) => {
      lines.push(
        <line
          key={`line-your-to-device-L${index}`}
          x1={device.x}
          y1={device.y - 30}
          x2={device.x}
          y2={device.y - 20}
          style={lineToDeviceStyle}
        />,
      );
    });

    robotsPositions.forEach((robot, index) => {
      lines.push(
        <line
          key={`line-your-to-robot-${index}`}
          x1={yourRouterPosition.x + 25}
          y1={yourRouterPosition.y - 32}
          x2={robot.x - 2}
          y2={robot.y + 30}
          style={lineToRobotStyle}
        />,
      );
    });

    robotsPositions.forEach((robot, index) => {
      lines.push(
        <line
          key={`line-your-to-robot-L${index}`}
          x1={robot.x - 2}
          y1={robot.y + 30}
          x2={robot.x - 2}
          y2={robot.y + 20}
          style={lineToRobotStyle}
        />,
      );
    });

    return lines;
  };

  const drawComponents = () => {
    const components = [];

    components.push(
      <foreignObject
        key="internet"
        x={internetPosition.x - 50}
        y={internetPosition.y - 25}
        width="60"
        height="60"
        opacity={topologyData.isConnectedToInternet ? 1 : 0.2}
      >
        <Icon name="internet" palleteFill={['#6b6b6b']} rotate={0} sizeH={40} sizeW={50} />
      </foreignObject>,
    );

    components.push(
      <foreignObject
        key="main-router"
        x={mainRouterPosition.x - 58}
        y={mainRouterPosition.y - 38}
        width="90"
        height="70"
        fill="blue"
        opacity={topologyData.isConnectedToMainRouter ? 1 : 0.2}
      >
        <Icon
          name="router"
          palleteFill={['#6b6b6b']}
          rotate={0}
          sizeH={40}
          sizeW={40}
          style={{ transform: 'scale(2)' }}
        />
      </foreignObject>,
    );

    components.push(
      <foreignObject x={yourRouterPosition.x - 25} y={yourRouterPosition.y - 25} width="100" height="100">
        <Icon
          name="mango"
          palleteFill={['#452AB6', '#F57715', '#F57715', '#F57715', '#F57715']}
          rotate={0}
          sizeH={40}
          sizeW={60}
          style={{ transform: 'scale(2.8)' }}
        />
      </foreignObject>,
    );

    devicePositions.forEach((device, index) => {
      components.push(
        <rect key={`device-${index}`} x={device.x - 15} y={device.y - 15} width="30" height="30" fill="green" />,
      );
    });

    robotsPositions.forEach((robot, index) => {
      components.push(
        <foreignObject key={`robot-${index}`} x={robot.x - 27} y={robot.y - 20} width="50" height="50" fill="yellow">
          <Icon name="thymio" palleteFill={['#0F0F0F', '#EAEAEA', '#CECECE']} rotate={0} sizeH={40} sizeW={40} />
        </foreignObject>,
      );
    });

    return components;
  };

  const drawStatusIcons = () => {
    const icons = [];
    const statusIconPositionInternet = {
      x: (internetPosition.x + mainRouterPosition.x) / 2 - 45,
      y: (internetPosition.y + mainRouterPosition.y) / 2 - 12,
    };
    const statusIconPositionRouter = {
      x: (mainRouterPosition.x + yourRouterPosition.x) / 2 - 28,
      y: (mainRouterPosition.y + yourRouterPosition.y) / 2 - 12,
    };

    // Icono de estado entre el Internet y el router principal
    icons.push(
      <foreignObject
        key="status-icon-internet"
        x={statusIconPositionInternet.x}
        y={statusIconPositionInternet.y}
        width="50"
        height="50"
      >
        <Icon
          name={topologyData.isConnectedToInternet ? 'check' : 'close'}
          palleteFill={[topologyData.isConnectedToInternet ? '#00ff00' : '#ff000080']}
          rotate={0}
          sizeH={20}
          sizeW={20}
          bgcolor="#fff"
          bgRound={true}
        />
      </foreignObject>,
    );

    // Icono de estado entre tu router y el router principal
    icons.push(
      <foreignObject
        key="status-icon-router"
        x={statusIconPositionRouter.x}
        y={statusIconPositionRouter.y}
        width="50"
        height="50"
      >
        <Icon
          name={topologyData.isConnectedToMainRouter ? 'wifi' : 'close'}
          palleteFill={[topologyData.isConnectedToMainRouter ? '#000' : '#ff000080']}
          rotate={0}
          sizeH={20}
          sizeW={20}
          bgcolor="#fff"
          bgRound={true}
          style={{ transform: 'scale(1.5)' }}
        />
      </foreignObject>,
    );

    return icons;
  };

  return (
    <SVGContainer>
      <svg viewBox="0 0 700 300">
        {drawLines()}
        {drawComponents()}
        {drawStatusIcons()} {/* Llama a la nueva función para dibujar los iconos de estado */}
      </svg>
    </SVGContainer>
  );
};

export default NetworkTopology;
