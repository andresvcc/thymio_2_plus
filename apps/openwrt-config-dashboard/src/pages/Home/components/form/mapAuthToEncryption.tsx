export type AuthenticationSuite = 'PSK' | 'PSK SAE' | 'SAE' | 'EAP' | 'FT-EAP' | 'FT-PSK' | 'WEP' | 'OWE' | 'NONE';

export function mapAuthSuiteToEncryption(authSuite: AuthenticationSuite): string {
  switch (authSuite) {
    case 'PSK':
      return 'psk2'; // WPA2-PSK
    case 'PSK SAE':
      return 'psk2+sae'; // WPA2/WPA3 Transition Mode
    case 'SAE':
      return 'sae'; // WPA3-SAE
    case 'EAP':
      return 'wpa-eap'; // WPA/WPA2 Enterprise
    case 'FT-EAP':
      return 'ft-eap'; // Fast Transition (Roaming)
    case 'FT-PSK':
      return 'ft-psk'; // Fast Transition with PSK
    case 'WEP':
      return 'wep'; // Obsolete and insecure
    case 'OWE':
      return 'owe'; // Opportunistic Wireless Encryption
    case 'NONE':
      return 'none'; // No encryption
    default:
      return authSuite;
  }
}

export function dbmToSignalQuality(dbmString: string): number {
  const dbm = parseFloat(dbmString.split(' ')[0]);

  if (isNaN(dbm)) {
    return 0;
  }

  const maxDbm = -45;
  const minDbm = -90;

  if (dbm >= maxDbm) {
    return 100;
  } else if (dbm <= minDbm) {
    return 0;
  } else {
    return ((dbm - minDbm) / (maxDbm - minDbm)) * 100;
  }
}
