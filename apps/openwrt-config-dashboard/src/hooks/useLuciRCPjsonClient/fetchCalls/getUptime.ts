import { LoginTokenResponse } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import tough, { Cookie } from 'tough-cookie';
import { Sid } from '..';

export async function getUptime({ sid }: { sid: Sid }): Promise<number> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', `sysauth_http=${sid}; sysauth=c294af01916d189dfb279f0f0353bff0`);

  var raw = JSON.stringify({
    method: 'exec',
    params: ["cat /proc/uptime | awk '{print $1}'"],
  });

  const response = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });

  const { result } = await response.json();

  // console.log('result getUptime', result);

  return parseFloat(result);
}
