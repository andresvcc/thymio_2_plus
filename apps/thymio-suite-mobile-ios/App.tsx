/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import StaticServer, {
  resolveAssetsPath,
} from '@dr.pogodin/react-native-static-server';
import {WebView} from 'react-native-webview';

const App = () => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    // Suponiendo que 'webroot' es una carpeta en la raíz de tu proyecto
    const server = new StaticServer({
      port: 3000,
      fileDir: resolveAssetsPath('webroot'),
      errorLog: true,
    });

    server.start().then(url => {
      setUrl(url);
    });

    return () => {
      server.stop();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>React Native WebView</Text>
      <Text>URL: {url}</Text>
      {url ? (
        <WebView source={{uri: url + '/scanner'}} style={styles.webview} />
      ) : (
        <SafeAreaView style={styles.loadingContainer}>
          {/* Puedes colocar aquí un componente de carga */}
          <Text>Loading...</Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
