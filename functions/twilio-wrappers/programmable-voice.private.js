import { ProgrammableVoiceUtils } from '@twilio/flex-plugins-library-utils';

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.callSid the unique call SID to fetch
 * @param {object} parameters.params recording creation parameters
 * @returns {Map} The new recording's properties
 * @description creates recording for the given call SID
 */
exports.createRecording = async (parameters) => {
  const { context, callSid, params } = parameters;

  const config = {
    attempts: 3,
    callSid,
    params,
  };

  const client = context.getTwilioClient();
  const voiceClient = new ProgrammableVoiceUtils(client, config);

  try {
    const recording = await voiceClient.createRecording(config);

    return {
      ...recording,
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.callSid the unique call SID to update recording
 * @param {string} parameters.recordingSid the unique recording SID to update
 * @param {object} parameters.params recording update parameters
 * @returns {Map} The recording's properties
 * @description updates the given recording for the given call
 */
exports.updateCallRecording = async (parameters) => {
  const { context, callSid, recordingSid, params } = parameters;

  const config = {
    attempts: 3,
    callSid,
    recordingSid,
    params,
  };

  const client = context.getTwilioClient();
  const voiceClient = new ProgrammableVoiceUtils(client, config);

  try {
    const recording = await voiceClient.updateCallRecording(config);

    return {
      ...recording,
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @param {string} parameters.conferenceSid the unique conference SID to update recording
 * @param {string} parameters.recordingSid the unique recording SID to update
 * @param {object} parameters.params recording update parameters
 * @returns {Map} The recording's properties
 * @description updates the given recording for the given call
 */
exports.updateConferenceRecording = async (parameters) => {
  const { context, conferenceSid, recordingSid, params } = parameters;

  const config = {
    attempts: 3,
    conferenceSid,
    recordingSid,
    params,
  };

  const client = context.getTwilioClient();
  const voiceClient = new ProgrammableVoiceUtils(client, config);

  try {
    const recording = await voiceClient.updateConferenceRecording(config);

    return {
      ...recording,
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};
