import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PausedRecording } from '../../types/PausedRecording';

import * as Flex from '@twilio/flex-ui';
import { combineReducers, Action as ReduxAction } from 'redux';

export interface PauseRecordingState {
  pausedRecordings: Array<PausedRecording>;
}

const initialState = { pausedRecordings: [] } as PauseRecordingState

const pauseRecordingSlice = createSlice({
  name: 'PauseRecording12',
  initialState,
  reducers: {
    pause(state, action: PayloadAction<PausedRecording>) {
      state.pausedRecordings.push(action.payload);
    },
    resume(state, action: PayloadAction<number>) {
      state.pausedRecordings.splice(action.payload, 1);
    },
  },
})

export const { pause, resume } = pauseRecordingSlice.actions;


// Register your redux store under a unique namespace
export const reduxNamespace = "PauseRecording12";

// Extend this payload to be of type that your ReduxAction is
// Normally you'd follow this pattern...https://redux.js.org/recipes/usage-with-typescript#a-practical-example
// But that breaks the typing when adding the reducer to Flex, so no payload intellisense for you!
export interface Action extends ReduxAction {
  payload?: any;
}

// Register all component states under the namespace
export interface AppState {
  flex: Flex.AppState;
  [reduxNamespace]: PauseRecordingState;
}
//export default combineReducers({ PauseRecording: pauseRecordingSlice.reducer });

export default pauseRecordingSlice.reducer;

