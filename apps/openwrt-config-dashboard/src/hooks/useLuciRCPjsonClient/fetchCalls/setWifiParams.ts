import axios, { AxiosRequestConfig } from 'axios';
import { Sid } from '..';

type LocalParams = {
  ssid: string;
  key: string;
};

type ExternalParams = {
  ssid: string;
  password: string;
  identity: string;
  encryption: string;
};

export async function setLocalWifiParams({ sid, params }: { sid: Sid; params: LocalParams }): Promise<any> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', `sysauth_http=${sid}; sysauth=c294af01916d189dfb279f0f0353bff0`);

  const configFile = `sed -i '/default_radio0/,/^$/{s/option ssid .*/option ssid "${params.ssid}"/; s/option key .*/option key "${params.key}"/;}' /etc/config/thymio2p`;

  var raw = JSON.stringify({
    method: 'exec',
    params: [configFile],
  });

  const response = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });

  if (response.status !== 200) {
    throw new Error('Error fetching get LocalWifiParams');
  }

  const result = await response.json();
  return result;
}

export async function setWirelessConfigFile({ sid, params }: { sid: Sid; params: any }): Promise<any> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', `sysauth_http=${sid}; sysauth=c294af01916d189dfb279f0f0353bff0`);

  const configFile = `sed -i "/config wifi-device 'radio0'/,/config wifi-iface/ s/option country '.*'/option country '${params.country}'/" /etc/config/wireless && echo '{"language":"${params.language}","country":"${params.country}"}' > /etc/config/ux-dashboard`;

  var raw = JSON.stringify({
    method: 'exec',
    params: [configFile],
  });

  const response = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });

  if (response.status !== 200) {
    throw new Error('Error fetching get LocalWifiParams');
  }

  const result = await response.json();

  return result.result === '';
}

type ConfigSection = {
  [key: string]: string;
};

type ConfigJSON = {
  [key: string]: ConfigSection;
};

function parseConfigToJSON(configStr: string): ConfigJSON {
  const configJSON: ConfigJSON = {};
  const sections = configStr.split(/(?=config \w+)/);

  sections.forEach((section) => {
    const headerMatch = section.match(/config ([\w-]+)\s+'([\w\s_-]+)'/);

    if (!headerMatch) {
      return;
    }

    const [, configType, configName] = headerMatch;
    const sectionKey = `${configType}_${configName}`;
    configJSON[sectionKey] = {};

    const options = section.split('\n').slice(1);
    options.forEach((optionLine) => {
      const optionMatch = optionLine.trim().match(/^option (\w+)[\s]+'?(.*?)'?$/);
      if (optionMatch) {
        const [, optionName, optionValue] = optionMatch;
        configJSON[sectionKey][optionName] = optionValue.replace(/^"(.+(?="$))"$/, '$1');
      }
    });
  });

  return configJSON;
}

function jsonifyConfigToString(configObj: ConfigJSON): string {
  let configStr = '';

  Object.entries(configObj).forEach(([sectionKey, options]) => {
    const splitIndex = sectionKey.indexOf('_');
    const configType = sectionKey.substring(0, splitIndex);
    const configName = sectionKey.substring(splitIndex + 1);

    configStr += `config ${configType} '${configName}'\n`;

    Object.entries(options).forEach(([optionName, optionValue]) => {
      const formattedValue = `'${optionValue}'`;
      configStr += `\toption ${optionName} ${formattedValue}\n`;
    });

    configStr += '\n';
  });

  return configStr.trim();
}

export async function setExternalWifiParams({ sid, params }: { sid: Sid; params: ExternalParams }): Promise<any> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', `sysauth_http=${sid}; sysauth=c294af01916d189dfb279f0f0353bff0`);

  const command = 'cat /etc/config/thymio2p';

  var raw = JSON.stringify({
    method: 'exec',
    params: [command],
  });

  const response = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });

  const resultF = await response.json();

  const jsonConfig = parseConfigToJSON(resultF.result);

  jsonConfig.thymio2p_choose.switch = 'true';

  if (params.encryption.includes('psk')) {
    jsonConfig['wifi-iface_wifinet1'] = {
      device: 'radio0',
      mode: 'sta',
      network: 'wwan',
      ssid: params.ssid,
      encryption: params.encryption,
      key: params.password,
    };
  } else if (params.encryption.includes('wpa')) {
    jsonConfig['wifi-iface_wifinet1'] = {
      device: 'radio0',
      mode: 'sta',
      network: 'wwan',
      ssid: params.ssid,
      encryption: params.encryption,
      eap_type: 'peap',
      password: params.password,
      identity: params.identity,
    };
  }

  const newConfigString = jsonifyConfigToString(jsonConfig);

  const configFile = `echo "${newConfigString}" > /etc/config/thymio2p`;

  var raw2 = JSON.stringify({
    method: 'exec',
    params: [configFile],
  });

  const response2 = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw2,
    redirect: 'follow',
  });

  if (response2.status !== 200) {
    throw new Error('Error fetching get LocalWifiParams');
  }

  const result = await response2.json();

  return result;
}

export type WifiNetwork = {
  ssid: string;
  signal: string;
  groupCipher: string;
  authSuites: string;
};

function parseWifiScanOutput(wifiScanOutput: string): WifiNetwork[] {
  const networks: WifiNetwork[] = [];
  const lines = wifiScanOutput.split('\n');

  let currentNetwork: WifiNetwork | null = null;

  lines.forEach((line) => {
    if (line.includes('SSID:')) {
      if (currentNetwork) {
        networks.push(currentNetwork);
      }
      currentNetwork = { ssid: '', signal: '', groupCipher: '', authSuites: '' };
      currentNetwork.ssid = line.split(':')[1].trim();
    } else if (line.includes('signal:') && currentNetwork) {
      currentNetwork.signal = line.split(':')[1].trim();
    } else if (line.includes('Group cipher:') && currentNetwork) {
      currentNetwork.groupCipher = line.split(':')[1].trim();
    } else if (line.includes('Authentication suites:') && currentNetwork) {
      currentNetwork.authSuites = line.split(':')[1].trim();
    }
  });

  if (currentNetwork) {
    networks.push(currentNetwork);
  }

  return networks;
}

export async function scannWifi({ sid, client }: { sid: string; client: boolean }) {
  try {
    const command = client
      ? "iw dev phy0-sta0 scan | egrep 'SSID:|signal:|Group cipher:|Authentication suites:'"
      : "rm -f /netlist && iw dev phy0-ap0 scan | egrep 'SSID:|signal:|Group cipher:|Authentication suites:' > /netlist &";

    const data = JSON.stringify({
      method: 'exec',
      params: [command],
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      url: '/cgi-bin/luci/rpc/sys',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      timeout: 20000,
    };

    const response = await axios(config);

    if (response.data.result !== null) {
      const networks = parseWifiScanOutput(response.data.result).filter(
        (network) => network.ssid.includes('x00') === false && network.ssid !== '',
      );

      return networks;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const rawGetNetlist = JSON.stringify({
        method: 'exec',
        params: ['cat /netlist'],
      });

      const configNetlist: AxiosRequestConfig = {
        ...config,
        data: rawGetNetlist,
      };

      const responseNetlist = await axios(configNetlist);

      const networksFromNetlist = parseWifiScanOutput(responseNetlist.data.result).filter(
        (network) => network.ssid.includes('x00') === false,
      );

      return networksFromNetlist;
    }
  } catch (error) {
    console.error('Error scanning WiFi:', error);
    return [];
  }
}
