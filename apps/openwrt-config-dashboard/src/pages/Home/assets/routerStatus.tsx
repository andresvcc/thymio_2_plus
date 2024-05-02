import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  margin: 20px;
`;

const Card = styled.div`
  flex: 0 1 250px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h2`
  font-size: 1.2em;
  color: #333;
  margin-bottom: 10px;
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eaeaea;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemLabel = styled.div`
  font-weight: bold;
  color: #333;
`;

const ItemValue = styled.div`
  color: #666;
`;

const RouterStatus = () => {
  return (
    <Container>
      <Card>
        <CardTitle>General Status</CardTitle>
        <StatusItem>
          <ItemLabel>Connection Status:</ItemLabel>
          <ItemValue>Connected</ItemValue>
        </StatusItem>
        <StatusItem>
          <ItemLabel>Uptime:</ItemLabel>
          <ItemValue>36 hours</ItemValue>
        </StatusItem>
      </Card>

      <Card>
        <CardTitle>Network Configuration</CardTitle>
        <StatusItem>
          <ItemLabel>IP Address:</ItemLabel>
          <ItemValue>192.168.1.1</ItemValue>
        </StatusItem>
        <StatusItem>
          <ItemLabel>Subnet Mask:</ItemLabel>
          <ItemValue>255.255.255.0</ItemValue>
        </StatusItem>
      </Card>

      <Card>
        <CardTitle>Wireless Settings</CardTitle>
        <StatusItem>
          <ItemLabel>Wi-Fi Enabled:</ItemLabel>
          <ItemValue>Yes</ItemValue>
        </StatusItem>
        <StatusItem>
          <ItemLabel>Signal Strength:</ItemLabel>
          <ItemValue>Excellent</ItemValue>
        </StatusItem>
      </Card>

      <Card>
        <CardTitle>Data Usage</CardTitle>
        <StatusItem>
          <ItemLabel>Downloaded:</ItemLabel>
          <ItemValue>1.2 GB</ItemValue>
        </StatusItem>
        <StatusItem>
          <ItemLabel>Uploaded:</ItemLabel>
          <ItemValue>300 MB</ItemValue>
        </StatusItem>
      </Card>

      <Card>
        <CardTitle>Performance</CardTitle>
        <StatusItem>
          <ItemLabel>Processor Load:</ItemLabel>
          <ItemValue>35%</ItemValue>
        </StatusItem>
        <StatusItem>
          <ItemLabel>Memory Usage:</ItemLabel>
          <ItemValue>45%</ItemValue>
        </StatusItem>
      </Card>

      <Card>
        <CardTitle>Connected Devices</CardTitle>
        <StatusItem>
          <ItemLabel>Total Devices:</ItemLabel>
          <ItemValue>8</ItemValue>
        </StatusItem>
        <StatusItem>
          <ItemLabel>New Devices:</ItemLabel>
          <ItemValue>2</ItemValue>
        </StatusItem>
      </Card>

      <Card>
        <CardTitle>System Logs</CardTitle>
        <StatusItem>
          <ItemLabel>Last Error:</ItemLabel>
          <ItemValue>None</ItemValue>
        </StatusItem>
        <StatusItem>
          <ItemLabel>Last Reboot Cause:</ItemLabel>
          <ItemValue>Manual Reboot</ItemValue>
        </StatusItem>
      </Card>

      <Card>
        <CardTitle>Network Speed</CardTitle>
        <StatusItem>
          <ItemLabel>Download Speed:</ItemLabel>
          <ItemValue>100 Mbps</ItemValue>
        </StatusItem>
        <StatusItem>
          <ItemLabel>Upload Speed:</ItemLabel>
          <ItemValue>40 Mbps</ItemValue>
        </StatusItem>
      </Card>
    </Container>
  );
};

export default RouterStatus;
