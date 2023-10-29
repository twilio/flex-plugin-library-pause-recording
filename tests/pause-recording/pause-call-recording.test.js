import helpers from '../test-utils/test-helper';

jest.mock('../../functions/helpers/prepare-function.private.js', () => ({
  __esModule: true,
  prepareFlexFunction: (_, fn) => fn,
}));
jest.mock('@twilio/flex-plugins-library-utils', () => ({
  __esModule: true,
  ProgrammableVoiceUtils: jest.fn(),
}));

import { ProgrammableVoiceUtils } from '@twilio/flex-plugins-library-utils';

const mockCallSid = 'CSxxxxx';
describe('Create Recording', () => {
  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction('helpers/prepare-function', './functions/helpers/prepare-function.private.js');
    global.Runtime._addFunction(
      'twilio-wrappers/programmable-voice',
      './functions/twilio-wrappers/programmable-voice.private.js',
    );
  });

  it('create recording is called successfully ', async () => {
    ProgrammableVoiceUtils.mockImplementation((value) => {
      return {
        updateCallRecording: jest.fn(() =>
          Promise.resolve({
            status: 200,
            recording: {},
            success: true,
          }),
        ),
      };
    });
    const createRecording = require('../../functions/pause-recording/pause-call-recording');
    const handlerFn = createRecording.handler;
    const mockContext = {
      getTwilioClient: () => () => jest.fn(),
    };
    const mockEvent = {
      callSid: 'CSxxxxx',
    };

    const mockResponse = new Twilio.Response();
    const mockErrorObject = jest.fn(() => Promise.resolve());

    const mockCallbackObject = (_err, response) => {
      expect(response).toBeInstanceOf(Twilio.Response);
      expect(response._statusCode).toEqual(200);
      expect(response._body.callSid).toBe(mockCallSid);
    };
    await handlerFn(mockContext, mockEvent, mockCallbackObject, mockResponse, mockErrorObject);
  });

  it('addParticipant error handler is called', async () => {
    const AddParticipant = require('../../functions/pause-recording/pause-call-recording');
    const handlerFn = AddParticipant.handler;
    const mockEvent = {
      callSid: 'CSxxxxx',
    };

    const mockResponse = new Twilio.Response();
    const mockCallbackObject = jest.fn();

    const mockErrorObject = jest.fn();
    await handlerFn({}, mockEvent, mockCallbackObject, mockResponse, mockErrorObject);
    expect(mockErrorObject.mock.calls.length).toBe(1);
  });
});
