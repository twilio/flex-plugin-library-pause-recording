import * as Flex from '@twilio/flex-ui';
import React from 'react';
import PauseRecordingButton from '../../custom-components/PauseRecordingButton';

export function addPauseRecordingButton(flex: typeof Flex) {
  
  const isNotInternalCall = (props: any) => props.task.attributes.client_call !== true;

  flex.CallCanvasActions.Content.add(<PauseRecordingButton key="pause-recording-button" />, {
    sortOrder: 2,
    if: isNotInternalCall
  });
}
