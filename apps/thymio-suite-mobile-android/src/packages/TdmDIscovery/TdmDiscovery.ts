import {createObservable, Observable, subscribe} from '../observables';
import type {MobsyaService, StatusZeroConf, Zeroconf} from './types';

function isIPv4(ip: string): boolean {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

export class TdmDiscovery {
  zeroconf: Zeroconf;

  tdmServices: Observable<{[key: string]: MobsyaService}> = createObservable({
    key: 'all services retourned by scan',
    initialValue: {},
  });

  status: Observable<StatusZeroConf> = createObservable({
    key: 'all services retourned by scan',
    initialValue: 'off',
  });

  constructor(nativeZeroConf: Zeroconf | any) {
    this.zeroconf = nativeZeroConf;

    this.zeroconf.on('found', (service: MobsyaService) => {
      // console.log('[Found]', JSON.stringify(service, null, 2));
    });

    this.zeroconf.on('resolved', (service: MobsyaService) => {
      // console.log('[Resolve]', JSON.stringify(service, null, 2));

      const ipv4 = service.addresses
        .map((address: string) => isIPv4(address))
        .reduce((acc: boolean, current: boolean) => acc || current, false);

      if (!ipv4) {
        this.zeroconf.stop();
        setTimeout(() => {
          // console.log('[RE-SCAN]', service);
          this.zeroconf.scan('mobsya', 'tcp', 'local.');
        }, 1500);
        return;
      }

      this.tdmServices.set({
        ...this.tdmServices.state,
        [service.host]: {
          ...service,
          host: isIPv4(service.host) ? service.host : `[${service.host}]`,
          addresses: service.addresses.map((address: string) =>
            isIPv4(address) ? address : `[${address}]`,
          ),
        },
      });
    });

    this.zeroconf.on('start', () => {
      if (this.status.state !== 'scaning') {
        this.status.set('scaning');
      }
    });

    this.zeroconf.on('stop', () => {
      if (this.status.state !== 'stoped') {
        this.status.set('stoped');
      }
    });

    this.zeroconf.on('error', (err: any) => {
      if (this.status.state !== 'error') {
        console.log('[Error]', err);
        this.status.set('error');
        this.scan();
      }
    });
  }

  onChange = (fun: (args: {[key: string]: MobsyaService}) => void) => {
    subscribe(this.tdmServices, () => fun(this.tdmServices.state));
  };

  onStatusChange = (fun: (status: StatusZeroConf) => void) => {
    subscribe(this.status, () => fun(this.status.state));
  };

  close = () => {
    this.zeroconf.stop();
  };

  scan = () => {
    console.log('[SCAN]');

    if (this.zeroconf.stop) {
      this.zeroconf.removeDeviceListeners();
      this.zeroconf.stop();
      this.zeroconf.addDeviceListeners();

      this.tdmServices.set({});
      this.zeroconf.scan('mobsya', 'tcp', 'local.');
    }
  };
}
