jest.mock('@twilio/flex-plugins-library-utils', () => ({
  __esModule: true,
  ProgrammableVoiceUtils: jest.fn(),
}));

import { ProgrammableVoiceUtils } from '@twilio/flex-plugins-library-utils';

const callSid = 'CSxxxxxxx';
const recordingSid = '123456';
const conferenceSid = '123';
describe('createRecording tests from ProgrammableVoice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('createRecording returns success response', async () => {
    ProgrammableVoiceUtils.mockImplementation((value) => {
      return {
        createRecording: jest.fn(() =>
          Promise.resolve({
            status: 200,
            recording: {},
            success: true,
          }),
        ),
      };
    });
    const { createRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid,
      params: {
        recordingChannels: 'dual',
      },
    };
    const context = {
      getTwilioClient: () => () => jest.fn(),
    };
    const recording = await createRecording({ context, ...parameters });
    expect(recording).toEqual({
      success: true,
      status: 200,
      recording: {},
    });
  });

  it('createRecording returns error response', async () => {
    ProgrammableVoiceUtils.mockImplementation((value) => {
      return {
        createRecording: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { createRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid,
      params: {
        recordingChannels: 'dual',
      },
    };

    const context = {
      getTwilioClient: () => () => jest.fn(),
    };
    const errRecording = await createRecording({ context, ...parameters });
    expect(errRecording).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('updateCallRecording tests from ProgrammableVoice ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('updateCallRecording returns success response', async () => {
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
    const { updateCallRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid,
      recordingSid,
      params: {
        status: 'paused',
        pauseBehavior: 'silence',
      },
    };
    const context = {
      getTwilioClient: () => () => jest.fn(),
    };

    const recording = await updateCallRecording({ context, ...parameters });
    expect(recording).toEqual({
      success: true,
      status: 200,
      recording: {},
    });
  });

  it('updateCallRecording returns error response', async () => {
    ProgrammableVoiceUtils.mockImplementation((value) => {
      return {
        updateCallRecording: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { updateCallRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      callSid,
    };

    const context = {
      getTwilioClient: () => () => jest.fn(),
    };
    const errRecording = await updateCallRecording({ context, ...parameters });
    expect(errRecording).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});

describe('updateConferenceRecording tests from ProgrammableVoice ', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('updateConferenceRecording returns success response', async () => {
    ProgrammableVoiceUtils.mockImplementation((value) => {
      return {
        updateConferenceRecording: jest.fn(() =>
          Promise.resolve({
            status: 200,
            recording: {},
            success: true,
          }),
        ),
      };
    });
    const { updateConferenceRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      conferenceSid,
      recordingSid,
      params: {
        status: 'paused',
        pauseBehavior: 'silence',
      },
    };
    const context = {
      getTwilioClient: () => () => jest.fn(),
    };

    const recording = await updateConferenceRecording({ context, ...parameters });
    expect(recording).toEqual({
      success: true,
      status: 200,
      recording: {},
    });
  });

  it('updateConferenceRecording returns error response', async () => {
    ProgrammableVoiceUtils.mockImplementation((value) => {
      return {
        updateConferenceRecording: jest.fn(() =>
          Promise.reject({
            success: false,
            status: 400,
            message: 'Mock Error Message',
          }),
        ),
      };
    });
    const { updateConferenceRecording } = require('../../functions/twilio-wrappers/programmable-voice.private');
    const parameters = {
      conferenceSid,
      recordingSid,
      params: {
        status: 'paused',
        pauseBehavior: 'silence',
      },
    };

    const context = {
      getTwilioClient: () => () => jest.fn(),
    };
    const errRecording = await updateConferenceRecording({ context, ...parameters });
    expect(errRecording).toEqual({
      success: false,
      status: 400,
      message: 'Mock Error Message',
    });
  });
});
