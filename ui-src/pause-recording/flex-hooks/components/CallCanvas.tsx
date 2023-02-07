import * as Flex from '@twilio/flex-ui';
import React from 'react';
import PauseStatusPanel from '../../custom-components/PauseStatusPanel';

export function addPauseStatusPanel(flex: typeof Flex) {
  flex.CallCanvas.Content.add(<PauseStatusPanel key="pause-status-panel" />, {
    sortOrder: -1
  });
}
