import { Spinner } from 'mobsya-theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from '.';
import { TopologyData } from '../../types';

interface RobotsTableProps {
  topologyData: TopologyData;
}

/**
 * Maps a value from the range [600, 900] to [1, 100].
 * @param value The value to be mapped.
 * @returns The mapped value within the range [1, 100].
 */
function mapBatteryValue(value: number): number {
  // Original range
  const minOriginal = 600;
  const maxOriginal = 800;

  // Ensure the value is within the expected range
  if (value < minOriginal) {
    value = minOriginal;
  }
  if (value > maxOriginal) {
    value = maxOriginal;
  }

  // Target range
  const minTarget = 1;
  const maxTarget = 100;

  // Calculate the ratio of the difference between the value and the original minimum
  // to the total range of the original values, then apply that ratio to the target range.
  return ((value - minOriginal) / (maxOriginal - minOriginal)) * (maxTarget - minTarget) + minTarget;
}

export const RobotsTable: React.FC<RobotsTableProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  const columns = [
    { key: 'name', label: t('infocard_thymiosTable_name'), render: (value: any) => value },
    {
      key: 'status',
      label: t('infocard_thymiosTable_status'),
      render: (value: any) => {
        const status: { [key: string]: string } = {
          available: t('infocard_thymiosTable_status_available'),
          busy: t('infocard_thymiosTable_status_busy'),
          connecting: t('infocard_thymiosTable_status_connecting'),
          missed: t('infocard_thymiosTable_status_missed'),
        };

        return status[value] ?? value;
      },
    },
    { key: 'type', label: t('infocard_thymiosTable_type'), render: (value: any) => value },
    { key: 'nodeId', label: t('infocard_thymiosTable_uuid'), render: (value: any) => value },
    {
      key: 'variables',
      label: t('infocard_thymiosTable_battery'),
      render: (value: { battery: string }) => (
        <div style={{ fontSize: '1rem', width: '30px' }}>
          {value.battery ? (
            `${mapBatteryValue(parseInt(value.battery, 10)).toFixed(0)}%`
          ) : (
            <Spinner name="dots" size={20} />
          )}
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={topologyData.yourRouter.robots} />;
};

export const RobotTableMobile: React.FC<RobotsTableProps> = ({ topologyData }) => {
  const { t } = useTranslation();

  const columns = [
    { key: 'name', label: t('infocard_thymiosTable_name'), render: (value: any) => value },
    {
      key: 'status',
      label: t('infocard_thymiosTable_status'),
      render: (value: any) => value,
    },
    { key: 'type', label: t('infocard_thymiosTable_type'), render: (value: any) => value },
    {
      key: 'variables',
      label: t('infocard_thymiosTable_battery'),
      render: (value: { battery: string }) => (
        <div style={{ fontSize: '1rem', width: '30px' }}>
          {value.battery ? (
            `${mapBatteryValue(parseInt(value.battery, 10)).toFixed(0)}%`
          ) : (
            <Spinner name="dots" size={20} />
          )}
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={topologyData.yourRouter.robots} />;
};
