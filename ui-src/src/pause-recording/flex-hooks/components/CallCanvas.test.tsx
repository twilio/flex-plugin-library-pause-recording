import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { addPauseStatusPanel } from './CallCanvas';
//import { Manager } from '@twilio/flex-ui';
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from "../../../utils/ErrorManager";



describe('CallCanvas', () => {
    let flex: typeof Flex = Flex;
    //let manager: Flex.Manager = Flex.Manager.getInstance();
    const addContentSpy = jest.spyOn(Flex.CallCanvas.Content, 'add');
    
    it('adds Pause Status Panel to call canvas', () => {
        addPauseStatusPanel(flex);
      expect(addContentSpy).toHaveBeenCalledTimes(1);
    });

    it.only('throws error using ErrorManager', async () => {
      const errorManagerSpy = jest.spyOn(ErrorManager, 'createAndProcessError');
      
      await addPauseStatusPanel().catch((err) => {
        expect(errorManagerSpy).toHaveBeenCalled();
        });
    });
  });
  