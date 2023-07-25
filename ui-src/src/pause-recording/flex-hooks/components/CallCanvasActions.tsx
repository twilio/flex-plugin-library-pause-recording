import * as Flex from '@twilio/flex-ui';
import React from 'react';
import PauseRecordingButton from '../../custom-components/PauseRecordingButton';
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from '../../../utils/ErrorManager';

export function addPauseRecordingButton(flex: typeof Flex) {
  const isNotInternalCall = (props: any) => props.task.attributes.client_call !== true;
  try {
    flex.CallCanvasActions.Content.add(<PauseRecordingButton key="pause-recording-button" />, {
      sortOrder: 2,
      if: isNotInternalCall,
    });
  } catch (e) {
    throw ErrorManager.createAndProcessError(
      'Could not add content for Flex component',
      {
        type: FlexPluginErrorType.programabelComponents,
        description: e instanceof Error ? `${e.message}` : 'Could not add content for Flex component',
        context: 'Plugin.Component.CallCanvas',
        wrappedError: e,
      },
      'pauserecording',
    );
  }
}
