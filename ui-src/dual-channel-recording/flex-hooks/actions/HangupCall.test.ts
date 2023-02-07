import * as Flex from '@twilio/flex-ui';
import { handleDualChannelHangupCall } from './HangupCall'
import '@testing-library/jest-dom'
import React from 'react';

jest.mock('../../helpers/dualChannelHelper', ()=>{
  return {
    addMissingCallDataIfNeeded : jest.fn()
  }
}) ;

describe('handleDualChannelHangupCall', () => {
  let flex: typeof Flex = Flex;
  let manager: Flex.Manager = Flex.Manager.getInstance();
    it('should call addMissingCallDataIfNeeded', async () => {
      const addListenerSpy = jest.spyOn(Flex.Actions, 'addListener');
      handleDualChannelHangupCall(flex, manager);
      await expect(addListenerSpy).toHaveBeenCalledTimes(1);
    //   expect(abortFunction).not.toHaveBeenCalled();
    });
})  