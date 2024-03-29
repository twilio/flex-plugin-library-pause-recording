import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { addPauseStatusPanel } from '../CallCanvas';
//import { Manager } from '@twilio/flex-ui';
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from '../../../../utils/ErrorManager';

describe('CallCanvas', () => {
  const flex: typeof Flex = Flex;

  //let manager: Flex.Manager = Flex.Manager.getInstance();
  const addContentSpy = jest.spyOn(Flex.CallCanvas.Content, 'add');

  it('adds Pause Status Panel to call canvas', () => {
    addPauseStatusPanel(flex);
    expect(addContentSpy).toHaveBeenCalledTimes(1);
  });
});
