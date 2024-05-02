import { LoginTokenResponse } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import tough, { Cookie } from 'tough-cookie';
import { Sid } from '..';

export async function getIfStatus({ sid }: { sid: Sid }): Promise<any> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', `sysauth_http=${sid}; sysauth=c294af01916d189dfb279f0f0353bff0`);

  var raw = JSON.stringify({
    method: 'exec',
    params: ['ifstatus wwan'],
  });

  const defaultIfSattus = {
    up: true,
    pending: false,
    available: true,
    autostart: true,
    dynamic: false,
    uptime: 158,
    l3_device: 'phy0-ap0',
    proto: 'dhcp',
    device: 'phy0-ap0',
    updated: ['addresses', 'routes', 'data'],
    metric: 0,
    dns_metric: 0,
    delegation: true,
    'ipv4-address': [
      {
        address: '192.168.8.1',
        mask: 24,
      },
    ],
    'ipv6-address': [],
    'ipv6-prefix': [],
    'ipv6-prefix-assignment': [],
    route: [
      {
        target: '0.0.0.0',
        mask: 0,
        nexthop: '192.168.1.1',
        source: '192.168.8.1/32',
      },
    ],
    'dns-server': ['192.168.1.1'],
    'dns-search': ['home'],
    neighbors: [],
    inactive: {
      'ipv4-address': [],
      'ipv6-address': [],
      route: [],
      'dns-server': [],
      'dns-search': [],
      neighbors: [],
    },
    data: {
      dhcpserver: '192.168.1.1',
      leasetime: 0,
    },
  };

  const response = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });

  const { result } = await response.json();

  if (`${result}`.includes('not found')) {
    return defaultIfSattus;
  }

  const ifstatus = JSON.parse(result);
  return ifstatus;
}
