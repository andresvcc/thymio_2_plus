import { WifiStatus } from './fetchCalls/getWifiStatus';

export type Sid = string | undefined;

export interface RouterData {
  devices: any[]; // Cambia "any" por el tipo adecuado si es posible
  isConnectedToInternet: boolean;
  wlanInfo: WifiStatus;
  robots: {
    nodeId: string;
    name: string;
    status: string;
    type: string;
    variables: { [key: string]: any };
  }[];
}

export interface Size {
  value: number;
  unit: string;
}

export interface RXTXStats {
  errors: number;
  dropped: number;
  overruns: number;
  frame?: number;
  carrier?: number;
  collisions?: number;
}

export interface Stats {
  bytes: number;
  size: Size;
  stats: RXTXStats | null;
}

export interface NetworkStats {
  rx: Stats;
  tx: Stats;
}

type InterfaceStatus = {
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

export interface ContextData {
  cycle: number;
  sid: string;
  sidTimeout: Date;
  firstUse: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  serverIp: string;
  times: number;
  updateAuthData: boolean;
  password: string;
  uptime: number;
  language: string;
  isConnectedToInternet: boolean;
  serverNotAvailable: boolean;
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
    isConnectedToInternet: boolean;
    sta0ESSID: string;
    encryption: string;
    signal: number;
    mode: string[];
    bitRate: string;
    lastConnection: string;
    dataTransfert: NetworkStats;
  };
  devices: any[];
  robots: {
    nodeId: string;
    name: string;
    status: string;
    type: string;
    variables: { [key: string]: any };
  }[];
}

export interface Event {
  type: string;
  data?: any;
}

export interface ServiceEvent {
  event: string;
  data?: any;
}

export const initialState: ContextData = {
  sidTimeout: new Date(),
  serverNotAvailable: false,
  cycle: 0,
  sid: '',
  firstUse: true,
  isLoggedIn: false,
  isLoading: false,
  serverIp: '',
  updateAuthData: false,
  times: 0,
  password: '',
  uptime: 0,
  language: 'en',
  isConnectedToInternet: false,
  ifStatus: {
    up: false,
    pending: false,
    available: false,
    autostart: false,
    dynamic: false,
    uptime: 0,
    l3_device: '',
    proto: '',
    device: '',
    updated: [],
    metric: 0,
    dns_metric: 0,
    delegation: false,
    ipv4_address: [],
    ipv6_address: [],
    ipv6_prefix: [],
    ipv6_prefix_assignment: [],
    route: [],
    dns_server: [],
    dns_search: [],
    neighbors: [],
    inactive: {
      ipv4_address: [],
      ipv6_address: [],
      route: [],
      dns_server: [],
      dns_search: [],
      neighbors: [],
    },
    data: {
      dhcpserver: '',
      leasetime: 0,
    },
  },
  configs: {
    mode: '',
    configFile: {
      sta: {
        ssid: '',
        encryption: '',
      },
      ap: {
        ssid: '',
        key: '',
      },
    },
  },
  wlanInfo: {
    isConnectedToInternet: false,
    sta0ESSID: '',
    encryption: '',
    signal: 0,
    mode: [],
    bitRate: '',
    lastConnection: '',
    dataTransfert: {
      rx: {
        bytes: 0,
        size: {
          value: 0,
          unit: '',
        },
        stats: null,
      },
      tx: {
        bytes: 0,
        size: {
          value: 0,
          unit: '',
        },
        stats: null,
      },
    },
  },
  devices: [],
  robots: [],
};

const useHttpClient = (options: { onlyLecture?: boolean } = {}) => {};

export default useHttpClient;
