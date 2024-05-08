import axios, { AxiosRequestConfig } from 'axios';
import { Sid } from '..';

export async function getInternetStatus({ sid }: { sid: Sid }): Promise<boolean> {
  const data = JSON.stringify({
    method: 'exec',
    params: ["wget -q --spider http://www.google.com 2>/dev/null && echo 'true' || echo 'false'"],
  });

  const config: AxiosRequestConfig = {
    method: 'post',
    url: '/cgi-bin/luci/rpc/sys',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
    timeout: 4000,
  };

  try {
    const response = await axios(config);

    if (response.status !== 200) {
      throw new Error('Error fetching getWifiConfigFile');
    }

    return response.data.result.includes('true');
  } catch (error: any) {
    if (axios.isCancel(error)) {
      return false;
    } else if (error.response) {
      return false;
    } else if (error.request) {
      return false;
    } else {
      console.log('Error:', error.message);
    }
    return false;
  }
}
