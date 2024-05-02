import React from 'react';
import Step1 from './steps/st1';
import Step2 from './steps/st2/st2';
import Step4 from './steps/st4/st4';
import Step5 from './steps/st5/st5';

import { Button, Icon, Typographie } from 'mobsya-theme';
import Step3 from './steps/st3/st3';

const FistUse = () => {
  const [step, setStep] = React.useState(1);

  const currentStep = {
    1: <Step1 next={setStep} />,
    2: <Step2 next={setStep} />,
    3: <Step3 next={setStep} />,
    4: <Step4 next={setStep} />,
    5: <Step5 next={setStep} />,
  }[step];

  return currentStep ?? <Step1 next={() => setStep(1)} />;
};

export default FistUse;
