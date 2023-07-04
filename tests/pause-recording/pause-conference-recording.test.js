import helpers from '../test-utils/test-helper';

jest.mock('../../functions/helpers/prepare-function.private.js', () => ({
  __esModule: true,
  prepareFlexFunction: (_, fn) => fn,
}));

const getVoiceMockTwilioClient = function (createRecording) {
  const mockVoiceService = {
    recordings: (_recordingSid) => mockFunctionTemp,  
  };
  const mockFunctionTemp = {
    update: (_params) => createRecording,  
  }
  return {
    conferences: (_conferenceSid) => mockVoiceService,
  };
};

const mockConferenceSid = 'CSxxxxx';
describe('Create Recording', () => {

  const createParticipant = jest.fn(() =>
    Promise.resolve({
      conferenceSid: mockConferenceSid,
    }),
  );

  beforeAll(() => {
    helpers.setup();
    global.Runtime._addFunction('helpers/prepare-function', './functions/helpers/prepare-function.private.js');
    global.Runtime._addFunction('helpers/parameter-validator', './functions/helpers/parameter-validator.private.js');
    global.Runtime._addFunction('twilio-wrappers/programmable-voice','./functions/twilio-wrappers/programmable-voice.private.js',);
    global.Runtime._addFunction(
      'twilio-wrappers/retry-handler',
      './functions/twilio-wrappers/retry-handler.private.js',
    );

  });
  it('create recording is called successfully ', async () => {
    const createRecording = require('../../functions/pause-recording/pause-conference-recording');
    const handlerFn = createRecording.handler;
    const mockContext = {
      PATH: 'mockPath',
      getTwilioClient: () => getVoiceMockTwilioClient(createParticipant),
    };
    const mockEvent = {
      conferenceSid: '1672673',
      pauseBehavior: 'pause',
      recordingSid: 'CSXXXX',
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
    const AddParticipant = require('../../functions/pause-recording/pause-conference-recording');
    const handlerFn = AddParticipant.handler;
    const mockEvent = {
      conferenceSid: 'mockSid',
    };

    const mockResponse = new Twilio.Response();
    const mockCallbackObject = jest.fn();

    const mockErrorObject = jest.fn();
    await handlerFn({}, mockEvent, mockCallbackObject, mockResponse, mockErrorObject);
    expect(mockErrorObject.mock.calls.length).toBe(1);
  });
});
