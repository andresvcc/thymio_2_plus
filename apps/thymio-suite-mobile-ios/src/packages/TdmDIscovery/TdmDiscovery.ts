import {createObservable, Observable, subscribe} from '../observables';
import type {MobsyaService, StatusZeroConf, Zeroconf} from './types';

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
    this.zeroconf.on('resolved', (service: MobsyaService) => {
      // console.log('[Resolve]', JSON.stringify(service.fullName, null, 2));
      if (!this.tdmServices.state[service.host]) {
        this.tdmServices.set({
          ...this.tdmServices.state,
          [service.host]: service,
        });
      }
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
      this.zeroconf.stop();
      this.tdmServices.set({});
      this.zeroconf.scan('mobsya', 'tcp', 'local.');
    }
  };
}
