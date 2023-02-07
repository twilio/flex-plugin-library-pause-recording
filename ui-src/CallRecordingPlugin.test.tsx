import CallRecordingPlugin from './CallRecordingPlugin';
import { render } from '@testing-library/react';
import * as React from 'react';
import {} from './pause-recording/custom-components/PauseRecordingButton';
import * as Flex from '@twilio/flex-ui';


jest.mock('@twilio/flex-ui', () => {
    return {
      Flex: {
        Actions: { addListener: jest.fn() },
      },
      Manager: { getInstance: jest.fn() },
        Notifications: { registerNotification: jest.fn() }
  }
    });

jest.mock('./utils/serverless/ProgrammableChat/ProgrammableChatService', () => {
    return {
        updateChannelAttributes: jest.fn()
    }
});
//../src/custom-components/PauseRecordingButton
jest.mock('./pause-recording/custom-components/PauseRecordingButton', () => {
    const PauseRecordingButton = () => <div />;
  return PauseRecordingButton;
});
jest.mock('./utils/serverless/TaskRouter/TaskRouterService', () => {
    return {
        updateTaskAssignmentStatus: jest.fn(),
        updateTaskAttributes: jest.fn(),
        getQueues: jest.fn(),
        getWorkerChannels: jest.fn(),
        updateWorkerChannel: jest.fn(),
    }
});

describe('test the CallRecordingPlugin initializer', () => {
    const ctp = new CallRecordingPlugin();
    let flex: typeof Flex = Flex;
    let manager: Flex.Manager = Flex.Manager.getInstance();
    it('initializes all action', () => {
        ctp.init(flex, manager)
    })
})