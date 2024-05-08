/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState, version} from 'react';
import {useTdm} from '../hooks/useTdm';

const isValidIp = (value: string) =>
  !!/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(value);

const filterValidIp = (addresses: string[]) => {
  const validAddresses = addresses.filter((_ip: string) => isValidIp(_ip));

  const lastElement =
    validAddresses.length > 0
      ? validAddresses[validAddresses.length - 1]
      : addresses[0];

  return {
    filteredAddresses: validAddresses,
    lastElement: lastElement,
  };
};

export interface Routers {
  fullname: string;
  id: string;
  ip: string;
  name: string;
  port: number;
  uuid: string;
  version: string;
  wsPort: string;
}

export const useTdmServices = () => {
  const {services, status, discovery} = useTdm();
  const [TDMServices, setLTServices] = useState<{[key: string]: any}>({});
  const [servicesList, setServicesList] = useState<Routers[]>([]);

  const [cycle, setCycle] = useState(2);
  const [first, setFirst] = useState(true);

  const loading = useMemo(() => {
    // console.log('status', {status, cycle});
    return status === 'scaning' && Object.keys(services).length === 0;
  }, [status, TDMServices, cycle]);

  const servicesNames = useMemo(() => Object.keys(services), [services]);

  const remoteServices = useMemo(
    () =>
      servicesNames.map(serviceName => {
        const dataService = TDMServices[serviceName];
        const service = {
          name: dataService?.name?.replace('Thymio Device Manager on', '').replace(/.local/, '').replace(/.lan/, '') ?? serviceName,
          uuid: dataService?.txt?.uuid,
          wsPort: dataService?.txt['ws-port'],
          port: dataService?.port,
          ip:
            filterValidIp(dataService?.addresses || []).lastElement,
        };
        return service;
      }),
    [TDMServices, servicesNames],
  );

  useEffect(() => {
    discovery.scan();
  }, []);

  useEffect(() => {
    if (services) {
      if (
        (first && JSON.stringify(services) !== '{}') ||
        (cycle >= 2 &&
          JSON.stringify(TDMServices) !== JSON.stringify(services)) ||
        (JSON.stringify(TDMServices) === '{}' &&
          JSON.stringify(services) !== '{}') ||
        (JSON.stringify(TDMServices) !== JSON.stringify(services) &&
          JSON.stringify(services) !== '{}')
      ) {
        setLTServices(services);
        setFirst(false);
        setLTServices(services);
        // console.log('services', services);
      }

      if (
        cycle < 2 &&
        JSON.stringify(services) === '{}' &&
        JSON.stringify(TDMServices) !== '{}'
      ) {
        setCycle(cycle + 1);
      } else {
        setCycle(0);
      }
    }
  }, [services]);

  useEffect(() => {
    setServicesList(
      remoteServices.map(service => ({
        ...service,
        name: service.name,
        version: '0.0.0',
        fullname: service.name || 'Thymio2+ unknown',
        id: service.name
          ? `${service.name}`
            .replace(/Thymio-/, '')
            .replace(/.local./, '')
            .replace(/.lan/, '')
          : 'unknown',
        ip: service.ip || '',
      })),
    );
  }, [remoteServices]);

  return {
    TDMServices: servicesList,
    servicesNames,
    scan: discovery.scan,
    loading,
  };
};
