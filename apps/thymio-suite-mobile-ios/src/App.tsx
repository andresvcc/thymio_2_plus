import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Home';
import Scratch from './scratch';
import Vpl3 from './vpl3';
import Thymio2pConfigurator from './Thymio2pConfigurator';
import {createContext, useContext, useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import StaticServer, {
  resolveAssetsPath,
  STATES,
} from '@dr.pogodin/react-native-static-server';
import {Text, View} from 'react-native';
import {set} from 'mobx';

const Stack = createNativeStackNavigator();

// Crea un contexto con un estado inicial
const LoadingContext = createContext({
  loading: true,
  setLoading: (loading: boolean) => {},
});

// Hook personalizado para usar el contexto
export const useLoading = () => useContext(LoadingContext);

const useAppState = (): AppStateStatus => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appState;
};

const App = () => {
  const appState = useAppState();

  const [server, setServer] = useState<StaticServer | null>(
    new StaticServer({
      port: 3000,
      fileDir: resolveAssetsPath('webroot'),
      errorLog: true,
      stopInBackground: true,
    }),
  );

  const [loading, setLoading] = useState(true);
  const [ServerState, setState] = useState(STATES.INACTIVE);
  const [times, setTimes] = useState(3);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (times < 3) {
        setTimes(times + 1);
        console.log('times', times);
      }
      if (times === 3) {
        if (STATES[ServerState] === `${STATES.CRASHED}`) {
          console.log('server crashed');
          setServer(
            new StaticServer({
              port: 3000,
              fileDir: resolveAssetsPath('webroot'),
              errorLog: true,
              stopInBackground: false,
            }),
          );

          setLoading(false);
        } else if (STATES[ServerState] === `${STATES.INACTIVE}`) {
          console.log('server inactive');
          server?.start().then(url => {
            setLoading(false);
          });
        } else {
          console.log('server active');
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [times, server, ServerState]);

  useEffect(() => {
    if (server) {
      setTimes(0);
      // Suponiendo que 'webroot' es una carpeta en la raíz de tu proyecto
      server.start().then(url => {
        setLoading(false);
      });

      server.addStateListener((state: number) => {
        console.log('state', STATES[state]);

        if (state === STATES.ACTIVE) {
          setLoading(false);
          setState(STATES.ACTIVE);
        }

        if (state === STATES.STARTING) {
          setLoading(true);
          setState(STATES.STARTING);
          setTimes(0);
        }

        if (state === STATES.STOPPING) {
          setState(STATES.STOPPING);
          // setLoading(true);
        }

        if (state === STATES.CRASHED) {
          setState(STATES.CRASHED);
          setLoading(true);
          setTimes(0);
        }

        if (state === STATES.INACTIVE) {
          setState(STATES.INACTIVE);
          setLoading(true);
          setTimes(0);
        }
      });
    }

    if (server && server.state === STATES.CRASHED) {
      console.log('server crashed');
      setLoading(true);
      setServer(
        new StaticServer({
          port: 3000,
          fileDir: resolveAssetsPath('webroot'),
          errorLog: true,
          stopInBackground: false,
        }),
      );

      setLoading(false);
    }

    if (server && server.state === STATES.INACTIVE) {
      console.log('server inactive');

      server.start().then(url => {
        setLoading(false);
      });
    }
  }, [server]);

  useEffect(() => {
    if (appState === 'background') {
      // server?.stop();
      // setLoading(true);
    }

    if (appState === 'active') {
      server?.start();
      setLoading(false);
    }
  }, [appState, server]);

  return (
    <LoadingContext.Provider value={{loading, setLoading}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#201439',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="Scratch"
            component={Scratch}
            options={{title: 'Scratch', gestureEnabled: false}}
          />
          <Stack.Screen
            name="VPL3"
            component={Vpl3}
            options={{title: 'VPL3', gestureEnabled: false}}
          />
          <Stack.Screen
            name="Thymio2pConfigurator"
            component={Thymio2pConfigurator}
            options={{title: 'Thymio2+ configuration', gestureEnabled: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LoadingContext.Provider>
  );
};

export default App;
