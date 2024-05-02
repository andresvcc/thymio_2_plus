import React from 'react';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import FistUse from './pages/FirstUse';

import { useDataState, useStateMachine } from './hooks/useLuciRCPjsonClient/stateMachine';
import Loading from './pages/Loading/st5';
import { Sections } from './components/Sections';

const App = () => {
  const { isLoggedIn, firstUse, updateAuthData, serverNotAvailable } = useDataState();
  const machine = useStateMachine();

  if (serverNotAvailable || (machine === 'disconnected' && !firstUse)) {
    return <NotFound />;
  }

  if (!updateAuthData) {
    return <Loading />;
  }

  if (firstUse) {
    return <FistUse />;
  }

  if (isLoggedIn && !firstUse) {
    return <Sections />;
  }

  return <Login />;
};

export default App;
