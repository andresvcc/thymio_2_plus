/**
 *
 * @Hooks
 * https://react.dev/reference/react#state-hooks
 */

import {useEffect, useState} from 'react';
import {zeroConfigFactory} from '../packages/TdmDIscovery';

const discoveryInstance = zeroConfigFactory();

export const useTdm = () => {
  const [updateAt, update] = useState(new Date());
  const discovery = discoveryInstance;
  const services = discovery.tdmServices.state;
  const status = discovery.status.state;

  useEffect(() => {
    discovery.onChange(state => {
      // console.log('[useTdm] onChange', state);
      update(new Date());
    });

    discovery.onStatusChange(() => {
      update(new Date());
    });
  }, [discovery]);

  return {services, status, discovery};
};
