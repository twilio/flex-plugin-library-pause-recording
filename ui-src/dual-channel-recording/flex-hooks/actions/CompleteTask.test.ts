import { handleDualChannelCompleteTask } from './CompleteTask'
import '@testing-library/jest-dom'
import * as Flex from '@twilio/flex-ui';

jest.mock('../../helpers/dualChannelHelper', ()=>{
  return {
    addMissingCallDataIfNeeded : jest.fn()
  }
}) ;

describe('handleDualChannelCompleteTask', () => {
  let flex: typeof Flex = Flex;
  let manager: Flex.Manager = Flex.Manager.getInstance();
  
    it('should call addMissingCallDataIfNeeded', async () => {
    const addListenerSpy = jest.spyOn(Flex.Actions, 'addListener');
   
    handleDualChannelCompleteTask(flex, manager);
      await expect(addListenerSpy).toHaveBeenCalledTimes(1);
    //   expect(abortFunction).not.toHaveBeenCalled();
    });
})  