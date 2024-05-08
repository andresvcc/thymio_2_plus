import Zeroconf from './zeroconf';
import {TdmDiscovery} from './TdmDiscovery';

export const zeroConfigFactory = () => {
  const nativeZeroConf = new Zeroconf();
  const instance = new TdmDiscovery(nativeZeroConf);
  return instance;
};
