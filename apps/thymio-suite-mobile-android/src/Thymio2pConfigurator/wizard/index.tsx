/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  AnyActorRef,
  AnyEventObject,
  MachineContext,
  MachineSnapshot,
  NonReducibleUnknown,
  StateValue,
} from 'xstate';

type WizardStepProps = {
  children: React.ReactNode;
  title: string;
};

const WizardStep = ({children, title}: WizardStepProps) => (
  <>
    <Text style={styles.stepTitle}>{title}</Text>
    <View style={styles.stepContainer}>{children}</View>
  </>
);
type StateMachine = {
  stateMachine: [
    state: MachineSnapshot<
      MachineContext,
      AnyEventObject,
      Record<string, AnyActorRef>,
      StateValue,
      string,
      NonReducibleUnknown
    >,
    send: (event: AnyEventObject) => void,
  ];
};
const Wizard = ({stateMachine}: StateMachine) => {
  const [state, send] = stateMachine;

  const handleNext = () => send({type: 'NEXT'});
  const handleBack = () => send({type: 'BACK'});
  const handleFinish = () => send({type: 'FINISH'});
  const handleReset = () => send({type: 'RESET'});

  useEffect(() => {
    if (state.matches('finished')) {
      const timeout = setTimeout(() => {
        handleReset();
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [state]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        {state.matches('stepZero') && (
          <WizardStep title="Paso 0">
            <Text>Este es el paso 0</Text>
          </WizardStep>
        )}
        {state.matches('stepOne') && (
          <WizardStep title="Paso 1">
            <Text>Este es el paso 1</Text>
          </WizardStep>
        )}
        {state.matches('stepTwo') && (
          <WizardStep title="Paso 2">
            <Text>Este es el paso 2</Text>
          </WizardStep>
        )}
        {state.matches('stepThree') && (
          <WizardStep title="Paso 3">
            <Text>Este es el paso 3</Text>
          </WizardStep>
        )}
        {state.matches('finished') && (
          <Text style={styles.finishedText}>Wizard Completado</Text>
        )}
      </View>
      {!state.matches('intro') && (
        <View style={styles.buttonContainer}>
          {state.matches('stepZero') ? (
            <Button title="Anterior" disabled />
          ) : !state.matches('finished') ? (
            <Button title="Anterior" onPress={handleBack} />
          ) : null}
          {!state.matches('finished') && (
            <Button
              title={state.matches('stepThree') ? 'Finalizar' : 'Siguiente'}
              onPress={state.matches('stepThree') ? handleFinish : handleNext}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Ajusta para distribuir el contenido
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    width: Dimensions.get('screen').width - 40,
    height: Dimensions.get('screen').height * 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Dimensions.get('screen').height * 0.068,
  },
  finishedText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Wizard;
