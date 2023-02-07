import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import * as React from 'react';

import AddReducers from './flex-hooks/redux';

import CustomizePasteElements from './utils/PasteThemeProvider';
import DualChannelRecordingNotifications from './dual-channel-recording/flex-hooks/notifications/DualChannelRecording';
import PauseRecordingNotifications from './pause-recording/flex-hooks/notifications/PauseRecording';
import PauseRecordingSlice from './pause-recording/flex-hooks/states/PauseRecordingSlice';
import { handleDualChannelCompleteTask } from './dual-channel-recording/flex-hooks/actions/CompleteTask';
import { handleDualChannelHangupCall } from './dual-channel-recording/flex-hooks/actions/HangupCall';
import PauseRecordingButton from './pause-recording/custom-components/PauseRecordingButton/PauseRecordingButton';
import PauseStatusPanel from './pause-recording/custom-components/PauseStatusPanel/PauseStatusPanel';
import { addPauseStatusPanel } from './pause-recording/flex-hooks/components/CallCanvas';
import { addPauseRecordingButton } from './pause-recording/flex-hooks/components/CallCanvasActions';

const PLUGIN_NAME = 'CallRecordingPlugin';

export default class CallRecordingPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager) {
    const initializers = [
        AddReducers,
        handleDualChannelCompleteTask,
        handleDualChannelHangupCall,
        //PauseRecordingButton,
        //PauseStatusPanel,
        addPauseStatusPanel,
        addPauseRecordingButton,
        //PauseRecordingSlice,
        PauseRecordingNotifications,
        CustomizePasteElements,
        DualChannelRecordingNotifications,
        //Events
    ];

    initializers.forEach((initializer) => initializer(flex, manager));
  }
}
