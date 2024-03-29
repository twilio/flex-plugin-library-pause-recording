import * as Flex from '@twilio/flex-ui';
import { AppState, reduxNamespace } from '../src/pause-recording/flex-hooks/states/PauseRecordingSlice';
import { mergeWith, unset } from 'lodash';

// NOTE: Not sure a great way to "set" the Flex redux store value
//       So the __mocks__/@twilio/flex-ui.js file will use this variable as value
//       And tests can use these functions to set value (will automatically get reset after each test)
let mockedReduxState: AppState = {
  flex: {phone : {activeCall:{parameters:{CallSid:"123"}}}} as unknown as Flex.AppState,
  [reduxNamespace]: {
    pausedRecordings : [
      {reservationSid : "123"}
    ],
  } as AppState[typeof reduxNamespace]
};

export const getMockedReduxState = () => mockedReduxState;
export const resetReduxState = () => {
  mockedReduxState = {
    flex: {} as Flex.AppState,
    [reduxNamespace]: {} as AppState[typeof reduxNamespace]
  };
}
export const setFlexReduxState = (appState: Partial<Flex.AppState>) => {
  mergeWith(mockedReduxState, { flex: appState }, (objValue, srcValue, key, obj) => {
    if (srcValue === undefined) {
      unset(obj, key);
    }
  });
}
export const setCustomReduxState = (appState: Partial<AppState[typeof reduxNamespace]>) => {
  mergeWith(mockedReduxState, { [reduxNamespace]: appState }, (objValue, srcValue, key, obj) => {
    if (srcValue === undefined) {
      unset(obj, key);
    }
  });
}
