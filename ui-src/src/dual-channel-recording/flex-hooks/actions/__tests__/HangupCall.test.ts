import * as Flex from '@twilio/flex-ui';
import { handleDualChannelHangupCall } from '../HangupCall';
import '@testing-library/jest-dom';
import * as dualChannel from '../../../helpers/dualChannelHelper';

jest.mock('../../../helpers/dualChannelHelper', () => {
  return {
    addMissingCallDataIfNeeded: jest.fn(),
  };
});

describe('handleDualChannelCompleteTask', () => {
  const flex: typeof Flex = Flex;
  const manager: Flex.Manager = Flex.Manager.getInstance();
  const actionSpy = jest.spyOn(dualChannel, 'addMissingCallDataIfNeeded');
  it('should call addMissingCallDataIfNeeded', async () => {
    //handleDualChannelCompleteTask(flex, manager);
    const addListenerSpy = jest.spyOn(Flex.Actions, 'addListener');

    await handleDualChannelHangupCall(flex, manager);
    const payload = {
      task: {
        attributes: { conference: '12345' },
      },
    };
    flex.Actions.invokeAction('HangupCall', payload);
    await expect(addListenerSpy).toHaveBeenCalledTimes(1);
    expect(actionSpy).toBeCalledWith(payload.task);
    await expect(actionSpy).toHaveBeenCalled();
  });
});
