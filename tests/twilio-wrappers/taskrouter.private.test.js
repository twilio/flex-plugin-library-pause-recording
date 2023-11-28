jest.mock('@twilio/flex-plugins-library-utils', () => ({
  __esModule: true,
  TaskRouterUtils: jest.fn(),
}));

import { TaskRouterUtils } from '@twilio/flex-plugins-library-utils';

describe('taskrouter.updateTaskAttributes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('updateTaskAttributes gives success', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        updateTaskAttributes: jest.fn(() =>
          Promise.resolve({
            status: 200,
            task: {
              attributes: '{ "attr1": "mockValue", "attr2": "mockValue" }',
            },
            success: true,
          }),
        ),
      };
    });
    const { updateTaskAttributes } = require('../../functions/twilio-wrappers/taskrouter.private');
    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      attributesUpdate: { attr1: 'mockValue', attr2: 'mockValue' },
      taskSid: 'TSxxxxxx',
      attempts: 0,
    };

    const task = await updateTaskAttributes({ ...payload });

    expect(task).toEqual({
      success: true,
      status: 200,
      task: { attributes: { attr1: 'mockValue', attr2: 'mockValue' } },
    });
  });

  it('updateTaskAttributes gives error', async () => {
    TaskRouterUtils.mockImplementation((value) => {
      return {
        updateTaskAttributes: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { updateTaskAttributes } = require('../../functions/twilio-wrappers/taskrouter.private');
    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const payload = {
      context: mockContext,
      attributesUpdate: '{}',
      taskSid: 'TSxxxxxx',
      attempts: '0',
    };

    const errTask = await updateTaskAttributes({ ...payload });

    expect(errTask).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});
