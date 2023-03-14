import { handleDualChannelCompleteTask } from '../CompleteTask'
import '@testing-library/jest-dom'
import * as Flex from '@twilio/flex-ui';

import * as dualChannel from "../../../helpers/dualChannelHelper";

jest.mock('../../../helpers/dualChannelHelper', ()=>{
  return {
    addMissingCallDataIfNeeded : jest.fn()
  }
}) ;

describe('handleDualChannelCompleteTask', () => {
  let flex: typeof Flex = Flex;
  let manager: Flex.Manager = Flex.Manager.getInstance();
  const actionSpy = jest.spyOn(dualChannel, 'addMissingCallDataIfNeeded');
  it('should call addMissingCallDataIfNeeded', async () => {
      //handleDualChannelCompleteTask(flex, manager);
    const addListenerSpy = jest.spyOn(Flex.Actions, 'addListener');

    await handleDualChannelCompleteTask(flex, manager);
    const payload = {
      task:{
      attributes: {conference : '12345'}
      }
    }
    flex.Actions.invokeAction('CompleteTask', payload)
    await expect(addListenerSpy).toHaveBeenCalledTimes(1);
    expect(actionSpy).toBeCalledWith(payload.task);
    await expect(actionSpy).toHaveBeenCalled();
    });
})  