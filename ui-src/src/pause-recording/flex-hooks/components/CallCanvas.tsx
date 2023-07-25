import * as Flex from '@twilio/flex-ui';
import React from 'react';
import PauseStatusPanel from '../../custom-components/PauseStatusPanel';
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from '../../../utils/ErrorManager';

export function addPauseStatusPanel(flex: typeof Flex) {
  try {
    flex.CallCanvas.Content.add(<PauseStatusPanel key="pause-status-panel" />, {
      sortOrder: -1,
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
