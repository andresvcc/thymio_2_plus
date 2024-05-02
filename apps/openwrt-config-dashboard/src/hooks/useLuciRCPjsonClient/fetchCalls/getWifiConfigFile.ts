import { Sid } from '..';

interface WifiInterface {
  device?: string;
  mode?: string;
  network?: string;
  ssid?: string;
  encryption?: string;
  key?: string;
}

interface ParsedConfig {
  wifiInterfaces: WifiInterface[];
}

function parseConfig(response: { result: string }): ParsedConfig {
  const wifiInterfaces: WifiInterface[] = [];
  const lines = response.result.split('\n');

  let currentWifiInterface: WifiInterface | null = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('config wifi-iface')) {
      if (currentWifiInterface) {
        wifiInterfaces.push(currentWifiInterface);
      }
      currentWifiInterface = {};
    } else if (currentWifiInterface && trimmedLine.startsWith('option')) {
      // Modificado para manejar comillas simples y dobles
      const match = trimmedLine.match(/option (\S+) ['"](.+)['"]/);
      if (match) {
        const key = match[1];
        const value = match[2];
        currentWifiInterface[key as keyof WifiInterface] = value;
      }
    }
  });

  // Añade la última interfaz WiFi si existe
  if (currentWifiInterface && Object.keys(currentWifiInterface).length > 0) {
    wifiInterfaces.push(currentWifiInterface);
  }

  return { wifiInterfaces };
}

export async function getWifiConfigFile({ sid }: { sid: Sid }): Promise<any> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', `sysauth_http=${sid}; sysauth=c294af01916d189dfb279f0f0353bff0`);

  // console.log('params', { sid, params });

  const pathConfigFile = 'cat /etc/config/wireless';
  const pathConfigFile2 = 'cat /etc/config/thymio2p';

  // console.log('configFile', configFile);

  var raw = JSON.stringify({
    method: 'exec',
    params: [pathConfigFile],
  });

  const response = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });

  if (response.status !== 200) {
    throw new Error('Error fetching getWifiConfigFile');
  }

  const result = await response.json();

  const { wifiInterfaces } = parseConfig(result);

  const mode = wifiInterfaces[0].mode;

  raw = JSON.stringify({
    method: 'exec',
    params: [pathConfigFile2],
  });

  const response2 = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });

  if (response2.status !== 200) {
    throw new Error('Error fetching getWifiConfigFile');
  }

  const result2 = await response2.json();

  // console.log('result2', result2);

  const { wifiInterfaces: wifiInterfaces2 } = parseConfig(result2);

  const configObjet = {
    mode,
    configFile: {
      sta: wifiInterfaces2.find((wifiInterface) => wifiInterface.mode === 'sta'),
      ap: wifiInterfaces2.find((wifiInterface) => wifiInterface.mode === 'ap'),
    },
  };

  return configObjet;
}
