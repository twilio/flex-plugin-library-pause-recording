import { TaskRouterUtils } from '@twilio/flex-plugins-library-utils';

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {string} parameters.taskSid the task to update
 * @param {string} parameters.attributesUpdate a JSON object to merge with the task
 * @returns {object} an object containing the task if successful
 * @description this operation safely updates the task attributes with the object
 * given by performing a deep merge with the existing task attributes and ensuring
 * its updating the version it started with using the ETag header
 * more explained here https://www.twilio.com/docs/taskrouter/api/task#task-version
 */
exports.updateTaskAttributes = async function updateTaskAttributes(parameters) {
  const { context, attempts, taskSid, attributesUpdate } = parameters;
  // const region = context.TWILIO_REGION ? context.TWILIO_REGION.split('-')[0] : '';
  const config = {
    attempts: attempts || 3,
    taskSid,
    attributesUpdate,
  };

  const client = context.getTwilioClient();
  const taskRouterClient = new TaskRouterUtils(client, config);

  try {
    const task = await taskRouterClient.updateTaskAttributes(config);

    return {
      success: task.success,
      status: task.status,
      task: {
        ...task.task,
        attributes: JSON.parse(task.task.attributes),
      },
    };
  } catch (error) {
    return { success: false, status: error.status, message: error.message };
  }
};
