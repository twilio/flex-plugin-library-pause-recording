import helpers from '../../test-utils/test-helper';
import axios from 'axios';

describe('taskrouter.updateTaskAttributes', () => {
  jest.mock('axios', () => ({
    post: jest.fn((_url, _body) => {
      return new Promise((resolve) => {
        resolve({
          data: {
            attributes: '{"attr1": "mockValue","attr2": "mockValue"}',
          },
        });
      });
    }),
    get: jest.fn((_url, _body) => {
      return new Promise((resolve) => {
        resolve({ data: { attributes: '{ "attr1": "mockValue" }' }, headers: { etag: '{"attr1":"value1"}' } });
      });
    }),
  }));
  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction(
      'twilio-wrappers/retry-handler',
      './functions/twilio-wrappers/retry-handler.private.js',
    );
  });

  it('updateTaskAttributes gives success', async () => {
    const { updateTaskAttributes } = require('../../functions/twilio-wrappers/taskrouter.private');
    const payload = {
      attributesUpdate: '{"attr2": "mockValue"}',
      taskSid: 'TSxxxxxx',
      attempts: 0,
      context: {}
    };

    const task = await updateTaskAttributes({ ...payload });

    expect(task).toEqual({
      success: true,
      status: 200,
      task: { attributes: { attr1: 'mockValue', attr2: 'mockValue' } },
    });
  });

  it('updateTaskAttributes gives error due to invalid attempts', async () => {
    const { updateTaskAttributes } = require('../../functions/twilio-wrappers/taskrouter.private');
    const payload = {
      attributesUpdate: '{"attr2": "mockValue"}',
      taskSid: 'TSxxxxxx',
      attempts: '0',
    };
    await updateTaskAttributes({ ...payload }).catch((err) => {
      expect(err).toMatch('Invalid parameters object passed. Parameters must contain the number of attempts');
    });
  });

  it('updateTaskAttributes gives error due to invalid taskSid', async () => {
    const { updateTaskAttributes } = require('../../functions/twilio-wrappers/taskrouter.private');
    const payload = {
      attributesUpdate: '{"attr2": "mockValue"}',
      taskSid: 123,
      attempts: 0,
    };
    await updateTaskAttributes({ ...payload }).catch((err) => {
      expect(err).toMatch('Invalid parameters object passed. Parameters must contain the taskSid string');
    });
  });

  it('updateTaskAttributes gives error due to invalid attributesUpdate', async () => {
    const { updateTaskAttributes } = require('../../functions/twilio-wrappers/taskrouter.private');

    const payload = {
      attributesUpdate: { attr2: 'mockValue' },
      taskSid: '123',
      attempts: 0,
    };
    await updateTaskAttributes({ ...payload }).catch((err) => {
      expect(err).toMatch('Invalid parameters object passed. Parameters must contain attributesUpdate JSON string');
    });
  });
});

