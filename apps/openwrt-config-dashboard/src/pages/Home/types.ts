import { NetworkStats } from '@/hooks/useLuciRCPjsonClient';

export interface PagesProps {
  selected: string;
  routerData: any;
}

export type Props = {
  topologyData: TopologyData;
};

export type InterfaceStatus = {
  up: boolean;
  pending: boolean;
  available: boolean;
  autostart: boolean;
  dynamic: boolean;
  uptime: number;
  l3_device: string;
  proto: string;
  device: string;
  updated: string[];
  metric: number;
  dns_metric: number;
  delegation: boolean;
  ipv4_address: Array<{
    address: string;
    mask: number;
  }>;
  ipv6_address: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
  ipv6_prefix: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
  ipv6_prefix_assignment: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
  route: Array<{
    target: string;
    mask: number;
    nexthop: string;
    source: string;
  }>;
  dns_server: string[];
  dns_search: string[];
  neighbors: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
  inactive: {
    ipv4_address: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
    ipv6_address: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
    route: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
    dns_server: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
    dns_search: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
    neighbors: Array<any>; // Ajusta según los posibles valores que puedan aparecer aquí
  };
  data: {
    dhcpserver: string;
    leasetime: number;
  };
};

export type TopologyData = {
  cycle: number;
  isConnectedToInternet: boolean;
  isConnectedToMainRouter: boolean;
  lastConnection: Date;
  mainRouter: {
    id: string;
    thymios: string[];
    robots: string[];
  };
  yourRouter: {
    sid: string;
    id: string;
    isConnectedToInternet: boolean;
    ifStatus: InterfaceStatus;
    configs: {
      mode: string;
      configFile: {
        sta: {
          ssid: string;
          encryption: string;
        };
        ap: {
          ssid: string;
          key: string;
        };
      };
    };
    wlanInfo: {
      sta0ESSID: string;
      encryption: string;
      signal: number;
      mode: string[];
      bitRate: string;
      dataTransfert: NetworkStats;
    };
    devices: {
      id: string;
      active: boolean;
      ip: string;
      mac: string;
    }[];
    robots: {
      nodeId: string;
      name: string;
      status: string;
      type: string;
    }[];
  };
};
