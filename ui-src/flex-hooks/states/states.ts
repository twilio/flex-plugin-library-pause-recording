
import PauseRecordingReducer, {
  PauseRecordingState
} from "../../pause-recording/flex-hooks/states/PauseRecordingSlice";

export interface CustomState {
  pauseRecording: PauseRecordingState;
}

export const customReducers = {
  
  pauseRecording: PauseRecordingReducer,
  
};

