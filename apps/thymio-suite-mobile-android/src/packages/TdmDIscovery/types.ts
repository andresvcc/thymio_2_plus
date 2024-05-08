/**
 * @types
 */
export interface MobsyaService {
  name: string;
  fullName: string;
  addresses: string[];
  host: string;
  port: number;
  txt: {
    [key: string]: any;
  };
}

export type ZeroconfEvents =
  | 'start'
  | 'stop'
  | 'update'
  | 'resolved'
  | 'error'
  | 'found';

export interface Zeroconf {
  scan: (type?: string, protocol?: string, domain?: string) => void;
  stop: () => void;
  getServices: () => {[name: string]: MobsyaService};
  getListeners: () => {[name: string]: any};
  removeDeviceListeners: () => void;
  addDeviceListeners: () => void;
  publishService: (
    type: string,
    protocol: string,
    domain?: string,
    name?: string,
    port?: number,
    txt?: {[key: string]: any},
  ) => void;
  unpublishService: (name: string) => void;
  on: (e?: ZeroconfEvents, listener?: (service?: any) => any) => any;
}

export type StatusZeroConf = 'off' | 'stoped' | 'scaning' | 'error';
