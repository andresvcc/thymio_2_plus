import axios, { AxiosRequestConfig } from 'axios';
import { Sid } from '..';

export async function getInternetStatus({ sid }: { sid: Sid }): Promise<boolean> {
  // Preparar el cuerpo de la solicitud y las cabeceras
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

    // Verificar el estado de la respuesta
    if (response.status !== 200) {
      throw new Error('Error fetching getWifiConfigFile');
    }

    return response.data.result.includes('true');
  } catch (error: any) {
    if (axios.isCancel(error)) {
      // console.log('La solicitud ha sido cancelada debido a un timeout');
      return false;
    } else if (error.response) {
      // console.log('Error response:', error.response.data);
      return false;
    } else if (error.request) {
      // console.log('No response received:', error.request);
      return false;
    } else {
      console.log('Error:', error.message);
    }
    return false;
  }
}
