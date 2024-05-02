import { LoginTokenResponse } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import tough, { Cookie } from 'tough-cookie';
import { Sid } from '..';

function parseStringToJson(inputString: string): any {
  // Eliminar caracteres no deseados como comillas y escapes
  const cleanedString = inputString.replace(/\\/g, '').replace(/"/g, '');

  // Dividir el string en líneas y luego en pares clave-valor
  const pairs = cleanedString
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line) => {
      const [key, value] = line.split(':');
      return [key.trim(), value.trim()];
    });

  // Construir el objeto JSON
  const jsonObject: any = {};
  pairs.forEach(([key, value]) => {
    jsonObject[key] = value;
  });

  return jsonObject;
}

type WifiQuality = 0 | 1 | 2 | 3 | 4 | 5;

function getWifiQuality(signalString: string): WifiQuality {
  // Extraer el valor numérico de la cadena
  const signalValue = parseInt(signalString.match(/-?\d+/)?.[0] || '0', 10);

  if (signalValue >= -50) {
    return 5; // Excelente
  } else if (signalValue >= -60) {
    return 4; // Muy bueno
  } else if (signalValue >= -70) {
    return 3; // Bueno
  } else if (signalValue >= -80) {
    return 2; // Regular
  } else if (signalValue >= -90) {
    return 1; // Débil
  } else {
    return 0; // Nulo
  }
}

function setDateFormat(configInfo: string) {
  const lines = configInfo.trim().split('\n');

  const configObject: Record<string, string> = lines.reduce((acc: any, line) => {
    const parts = line.trim().split(/\s+/);
    const fileName = parts.pop();

    if (fileName) {
      const month = parts[5];
      const day = parts[6];
      const time = parts[7];
      const year = new Date().getFullYear(); // Asignamos el año actual, puedes ajustarlo según tus necesidades

      acc[fileName] = new Date(`${month} ${day} ${year} ${time}`);
    }

    return acc;
  }, {});

  return configObject;
}

//----

interface Size {
  value: number;
  unit: string;
}

interface Stats {
  bytes: number;
  size: Size;
  stats: RXTXStats | null;
}

export interface NetworkStats {
  rx: Stats;
  tx: Stats;
}

export interface RXTXStats {
  errors: number;
  dropped: number;
  overruns: number;
  frame?: number;
  carrier?: number;
  collisions?: number;
}

function extractRXAndTXErrors(line: string): { RX: RXTXStats | null; TX: RXTXStats | null } {
  const RXRegex = /RX packets:\d+ errors:(\d+) dropped:(\d+) overruns:(\d+)(?: frame:(\d+))?/;
  const TXRegex = /TX packets:\d+ errors:(\d+) dropped:(\d+) overruns:(\d+)(?: carrier:(\d+) collisions:(\d+))?/;

  const RXMatch = line.match(RXRegex);
  const TXMatch = line.match(TXRegex);

  const extractStats = (match: RegExpMatchArray | null): RXTXStats | null => {
    if (match) {
      return {
        errors: parseInt(match[1], 10),
        dropped: parseInt(match[2], 10),
        overruns: parseInt(match[3], 10),
        frame: match[4] ? parseInt(match[4], 10) : 0,
        carrier: match[5] ? parseInt(match[5], 10) : 0,
        collisions: match[6] ? parseInt(match[6], 10) : 0,
      };
    }
    return null;
  };

  return {
    RX: extractStats(RXMatch),
    TX: extractStats(TXMatch),
  };
}

function parseNetworkStats(input: string): NetworkStats {
  const stats: NetworkStats = {
    rx: {} as Stats,
    tx: {} as Stats,
  };

  const regex = /RX bytes:(\d+) .* TX bytes:(\d+) .*/;
  const match = input.match(regex)?.toString();

  if (match) {
    const extacted = extractValues(`${match}`);

    if (extacted) {
      const { RX, TX } = extractRXAndTXErrors(input);

      stats.rx = { ...extacted.rx, stats: RX };
      stats.tx = { ...extacted.tx, stats: TX };
    }
  }

  return stats;
}

function extractValues(line: string): NetworkStats | null {
  const regex = /RX bytes:(\d+) \(([\d.]+)\s+(\w+)\).*TX bytes:(\d+) \(([\d.]+)\s+(\w+)\)/;
  const match = line.match(regex);

  if (match) {
    const createStats = (bytes: number, value: string, unit: string): Stats => ({
      bytes,
      size: { value: parseFloat(value), unit },
      stats: null,
    });

    return {
      rx: createStats(parseInt(match[1], 10), match[2], match[3]),
      tx: createStats(parseInt(match[4], 10), match[5], match[6]),
    };
  }

  return null;
}

//----

type WifiInfo = {
  'phy0-sta0 ESSID': string;
  'Access Point': string;
  Mode: string;
  'Center Channel 1': string;
  'Tx-Power': string;
  Signal: string;
  'Bit Rate': string;
  Encryption: string;
  Type: string;
  Hardware: string;
  'TX power offset': string;
  'Frequency offset': string;
  'Supports VAPs': string;
};

export type WifiStatus = {
  sta0ESSID: string;
  encryption: string;
  signal: number;
  mode: string[];
  bitRate: string;
  lastConnection: string;
  dataTransfert: NetworkStats;
};

export async function getWifiStatus({ sid }: { sid: Sid }): Promise<WifiStatus> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', `sysauth_http=${sid}; sysauth=c294af01916d189dfb279f0f0353bff0`);

  var raw = JSON.stringify({
    method: 'exec',
    params: ['iwinfo'],
  });

  const response = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });

  const { result } = await response.json();

  const { Encryption, Signal, Mode, ...rest }: WifiInfo = parseStringToJson(result);

  var rawUptime = JSON.stringify({
    method: 'exec',
    params: ['ls -l /etc/config/'],
  });

  const uptime = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: rawUptime,
    redirect: 'follow',
  });

  const responseUptime = await uptime.json();

  const { network } = setDateFormat(responseUptime.result);

  var rawIfconfig = JSON.stringify({
    method: 'exec',
    params: ['ifconfig phy0-ap0'],
  });

  var ifconfig = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: rawIfconfig,
    redirect: 'follow',
  });

  var responseIfconfig = await ifconfig.json();

  if (responseIfconfig.result === '') {
    rawIfconfig = JSON.stringify({
      method: 'exec',
      params: ['ifconfig phy0-sta0'],
    });

    ifconfig = await fetch('/cgi-bin/luci/rpc/sys', {
      method: 'POST',
      headers: myHeaders,
      body: rawIfconfig,
      redirect: 'follow',
    });

    responseIfconfig = await ifconfig.json();
  }

  const dataTransfert = parseNetworkStats(responseIfconfig.result);

  const wifiStatus = {
    encryption: Encryption,
    signal: getWifiQuality(Signal),
    sta0ESSID: rest['phy0-sta0 ESSID'],
    mode: Mode.split('  '),
    bitRate: rest['Bit Rate'],
    lastConnection: network,
    dataTransfert,
  };

  return wifiStatus;
}
