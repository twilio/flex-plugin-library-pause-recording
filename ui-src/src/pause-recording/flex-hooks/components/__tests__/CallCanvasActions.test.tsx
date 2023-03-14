import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { addPauseRecordingButton } from '../CallCanvasActions';

describe('CallCanvas', () => {
  let flex: typeof Flex = Flex;
  const addContentSpy = jest.spyOn(Flex.CallCanvasActions.Content, 'add');

  it('adds ConferenceMonitor and Conference Dialog to call canvas', () => {
    addPauseRecordingButton(flex);
    expect(addContentSpy).toHaveBeenCalledTimes(1);
  });
});
