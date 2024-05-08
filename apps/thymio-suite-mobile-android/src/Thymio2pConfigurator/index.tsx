/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/no-unstable-nested-components */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

import {WebView, WebViewNavigation} from 'react-native-webview';
import MangoIcon from '../assets/mango-icon';
import MangoIconColor from '../assets/mango-icon-color';
import BackIcon from '../assets/back-icon';
import CloseIcon from '../assets/launcher-icon-close';
import HelpIcon from '../assets/launcher-icon-help-blue';
import {CommonActions} from '@react-navigation/native';

import {useTdm} from '../hooks/useTdm';
import {getPathAfterLocalhost, getQueryParams} from '../helpers/parsers';
import {Routers, useTdmServices} from './useTdmConfigurator';
import Wizard from './wizard';
import {useMachine} from '@xstate/react';
import {wizardMachine} from './wizard/wizardMachine';
import useWifiScanner from './useWifiScanner';
import {set} from 'mobx';

function Thymio2p({navigation}: any): JSX.Element {
  const [state, send] = useMachine(wizardMachine);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  const isDarkMode = useColorScheme() === 'dark';
  const {TDMServices, servicesNames} = useTdmServices();

  const backgroundStyle = {
    backgroundColor: '#201439',
  };

  const onBackPress = () => {
    console.log('webViewUrl:', webViewUrl);
    if (webViewUrl !== null) {
      Alert.alert(
        'Do you really want to give up?',
        'You are currently on a configuration page, finish all your settings before returning.',
        [
          {
            text: 'Annuler',
            onPress: () => console.log('Annulation'),
            style: 'cancel',
          },
          {
            text: 'Oui',
            onPress: () => setWebViewUrl(null),
          },
        ],
        {cancelable: true},
      );
    } else {
      console.log('Go back');
      navigation.dispatch(CommonActions.goBack());
    }
  };

  const openConfigWebPage = async (url: string) => {
    // Verificar si el dispositivo puede abrir esta URL
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      try {
        await Linking.openURL(url);
      } catch (error) {
        console.error('No se pudo abrir la URL:', error);
      }
    } else {
      console.error('No se puede abrir esta URL:', url);
    }
  };

  const setWebviewConfigAccess = (router: Routers) => {
    // Actualizar el estado para mostrar la WebView con la URL deseada
    setWebViewUrl(`http://${router.ip}/`);
  };

  const handleWizard = (router: Routers) => {
    // send({type: 'WIZARD'});
    // openConfigWebPage(`http://${router.ip}/`);
    setWebviewConfigAccess(router);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.titleContainer}>
          <MangoIcon />
          <Text style={styles.titleBar}>Thymio2+ Configurator</Text>
        </View>
      ),
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={() => onBackPress()}>
            <BackIcon />
          </TouchableOpacity>
        </View>
      ),
      headerTitleAlign: 'center',
      headerShown: state.matches('intro'),
    });
  }, [navigation, state, webViewUrl]);

  if (webViewUrl) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <WebView
          source={{uri: webViewUrl}}
          style={{flex: 1}}
          onNavigationStateChange={(navState: WebViewNavigation) => {
            // this is the function that will be called when the user presses the back button
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {state.matches('intro') ? (
        <View style={styles.container}>
          <View style={styles.title}>
            <TouchableOpacity>
              <Text>
                Lorem Ipsum est un texte d'espace réservé couramment utilisé
                dans les industries graphique, imprimée et éditoriale pour
                prévisualiser les mises en page et les maquettes visuelles.
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pageContainer}>
            <View style={styles.descriptionContainer}>
              <View style={styles.subTitleDescription}>
                <Text>Choose a Thymio2+ router to configure</Text>
              </View>
            </View>
            <View style={styles.routersContainer}>
              {TDMServices.map((service: any, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleWizard(service)}>
                  <View style={styles.itemContainer}>
                    <View
                      style={{
                        transform: 'scale(1.8)',
                      }}>
                      <MangoIconColor />
                    </View>
                    <Text>{service.id}</Text>
                    <Text
                      style={styles.versionText}>{`v${service.version}`}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <Wizard stateMachine={[state, send]} />
      )}
    </SafeAreaView>
  );
}

/*



*/

export default Thymio2p;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    width: Dimensions.get('screen').width - 10,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width - 10,
    height: Dimensions.get('screen').height * 0.1,
    padding: 10,
    marginBottom: 20,
  },
  titleBar: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContainer: {
    width: Dimensions.get('screen').width - 50,
    height: Dimensions.get('screen').height - 200,
    padding: 10,
    flex: 0,
    flexDirection: 'row',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: (Dimensions.get('screen').width - 90) / 2,
    padding: 10,
    paddingRight: 50,
  },
  subTitleDescription: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Dimensions.get('screen').height * 0.1,
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routersContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: (Dimensions.get('screen').width - 50) / 2,
    height: Dimensions.get('screen').height - 220,
    paddingRight: 30,
    paddingLeft: 50,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    fontSize: 10,
    color: 'gray',
  },
});
