import {createMachine, assign} from 'xstate';

export const wizardMachine = createMachine({
  id: 'wizard',
  initial: 'intro',
  context: {
    // Aquí puedes almacenar datos de los pasos si es necesario
  },
  states: {
    intro: {on: {WIZARD: 'stepZero'}},
    stepZero: {on: {NEXT: 'stepOne'}},
    stepOne: {on: {NEXT: 'stepTwo', BACK: 'stepZero'}},
    stepTwo: {on: {NEXT: 'stepThree', BACK: 'stepOne'}},
    stepThree: {on: {FINISH: 'finished', BACK: 'stepTwo'}},
    finished: {on: {RESET: 'intro'}},
  },
});
