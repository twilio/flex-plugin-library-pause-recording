import AddReducers from '../index';
import * as Flex from '@twilio/flex-ui';

describe('addReducer', () => {
  const flex: typeof Flex = Flex;
  const manager: Flex.Manager = Flex.Manager.getInstance();
  const addContentSpy = jest.spyOn(manager.store, 'addReducer');

  it('calls addReducer from manager', () => {
    AddReducers(flex, manager);
    expect(addContentSpy).toHaveBeenCalledTimes(1);
  });
});
