import taskAcceptedHandler from '../taskAccepted';
import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexEvent } from '../../../../types/manager/FlexEvent';
import RecordingService from '../../../../pause-recording/helpers/RecordingService';
import {
  addCallDataToTask,
  waitForConferenceParticipants,
  waitForActiveCall,
} from '../../../helpers/dualChannelHelper';

const direction_value1 = 'outbound';
const direction_value2 = 'inbound';

const client_call_value1 = true;
const client_call_value2 = false;

const taskStatus_running = 'ongoing';

const mockRecording = {
  sid: '123456789',
};

jest.mock('../../../helpers/dualChannelHelper', () => {
  return {
    waitForActiveCall: jest.fn().mockReturnValue('123456'),
    addCallDataToTask: jest.fn(),
    waitForConferenceParticipants: jest.fn(),
    // waitForConferenceParticipants : jest.fn().mockReturnValue(['worker',{participantType : 'customer', callSid : '123'},'123','12334'])
  };
});
describe('taskAcceptedHandler', () => {
  it('taskAcceptedHandler is called with client call true', () => {
    waitForConferenceParticipants.mockReturnValue(
      Promise.resolve(['worker', { participantType: 'customer', callSid: '123' }, '123', '12334']),
    );
    const spy = jest.spyOn(RecordingService, 'startDualChannelRecording').mockReturnValue(mockRecording);
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    const mockTask = {
      attributes: {
        client_call: client_call_value1,
        direction: direction_value1,
        conversations: {},
      },
      sid: '123456',
      taskStatus: taskStatus_running,
    };
    taskAcceptedHandler(mockTask, FlexEvent);
  });

  it('taskAcceptedHandler is called with client call true and no callSid value', () => {
    waitForConferenceParticipants.mockReturnValue(
      Promise.resolve(['worker', { participantType: 'customer' }, '123', '12334']),
    );
    const spy = jest.spyOn(RecordingService, 'startDualChannelRecording').mockReturnValue(mockRecording);
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    const mockTask = {
      attributes: {
        client_call: client_call_value1,
        direction: direction_value1,
        conversations: {},
      },
      sid: '123456',
      taskStatus: taskStatus_running,
    };
    taskAcceptedHandler(mockTask, FlexEvent);
  });

  it('taskAcceptedHandler is called with client call false', () => {
    const spy = jest.spyOn(RecordingService, 'startDualChannelRecording').mockReturnValue(mockRecording);
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    const mockTask = {
      attributes: {
        client_call: client_call_value2,
        direction: direction_value1,
        conversations: {},
      },
      sid: '123456',
      taskStatus: taskStatus_running,
    };
    taskAcceptedHandler(mockTask, FlexEvent);
  });

  it('taskAcceptedHandler is called with no conversations', () => {
    waitForConferenceParticipants.mockReturnValue(Promise.resolve(['worker', 'customer', '123', '12334']));
    const spy = jest.spyOn(RecordingService, 'startDualChannelRecording').mockReturnValue(mockRecording);
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    const mockTask = {
      attributes: {
        client_call: client_call_value1,
        direction: direction_value1,
      },
      sid: '123456',
      taskStatus: taskStatus_running,
    };
    taskAcceptedHandler(mockTask, FlexEvent);
  });
});

describe('failing cases', () => {
  it('taskAcceptedHandler is called with no conversations', () => {
    waitForConferenceParticipants.mockReturnValue(Promise.resolve(['worker', 'customer', '123', '12334']));
    const spy = jest.spyOn(RecordingService, 'startDualChannelRecording').mockReturnValue(mockRecording);
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    const mockTask = {
      attributes: {
        client_call: client_call_value1,
        direction: direction_value1,
        conversations: {},
      },
      sid: '123456',
      taskStatus: taskStatus_running,
    };
    taskAcceptedHandler(mockTask, FlexEvent);
  });
});
