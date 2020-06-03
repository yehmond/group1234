import React, { PureComponent } from 'react';
import { Barbershop } from "../../types/barbershop";
import StepperHeader from "../Stepper/StepperHeader";
import { ADD_BARBERSHOP_STEPS, PROVINCES, SERVICES_OFFERED } from "../../types/constants";

interface RBSConfirmProps {
    barbershop: Barbershop;
}

class RBSConfirm extends PureComponent<RBSConfirmProps,{}> {

  render() {
    return (
        <div>
            <StepperHeader
                currentStep={2}
                stepLabels={ADD_BARBERSHOP_STEPS}
            />
            <div className="rbs-page-content">
              <h1>Summary</h1>
            </div>
        </div>

    );
  }
}

export default RBSConfirm;
