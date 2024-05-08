/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import {useEffect, useState} from 'react';
import WifiManager, {
  connectToSSID,
  loadWifiList,
} from 'react-native-wifi-reborn';
import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

const useWifiScanner = () => {
  const [wifiList, setWifiList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ssid, setSsid] = useState('');

  useEffect(() => {
    checkPermissions();
  }, []);

  const initWifi = async () => {
    try {
      if (WifiManager.setEnabled) {
        const st = await WifiManager.setEnabled(true);
        console.log('Wifi enabled:', st);
      }

      console.log('wifiList:', wifiList);
    } catch (error: any) {
      console.log('Cannot get current SSID!', {error});
    }
  };

  const checkPermissions = async () => {
    try {
      const statuses = await checkMultiple([
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.LOCATION_ALWAYS,
      ]);

      if (statuses['ios.permission.LOCATION_WHEN_IN_USE'] === RESULTS.GRANTED) {
        console.log('Location permission granted');
        await initWifi();
      } else {
        console.log('Location permission not granted');

        // get location permission
        const permissionStatus = await requestMultiple([
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        ]);

        if (
          permissionStatus['ios.permission.LOCATION_ALWAYS'] ===
            RESULTS.GRANTED ||
          permissionStatus['ios.permission.LOCATION_WHEN_IN_USE'] ===
            RESULTS.GRANTED
        ) {
          console.log('Location permission granted');
          await initWifi();
        } else {
          console.log('Location permission denied');
          setError('Location permission denied');
        }
      }
    } catch (error: any) {
      console.error('Location permission error:', error);
      setError('Location permission error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {wifiList, loading, error};
};

export default useWifiScanner;
