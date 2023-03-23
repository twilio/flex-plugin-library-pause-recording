import ApiService from "../ApiService";
import { EncodedParams } from "../../../types/serverless";

export interface Queue {
  targetWorkers: string;
  friendlyName: string;
  sid: string;
}

interface UpdateTaskAttributesResponse {
  success: boolean;
}

interface GetQueuesResponse {
  success: boolean;
  queues: Array<Queue>;
}

interface GetWorkerChannelsResponse {
  success: boolean;
  workerChannels: Array<WorkerChannelCapacityResponse>;
}

export interface WorkerChannelCapacityResponse {
  accountSid: string;
  assignedTasks: number;
  available: boolean;
  availableCapacityPercentage: number;
  configuredCapacity: number;
  dateCreated: string;
  dateUpdated: string;
  sid: string;
  taskChannelSid: string;
  taskChannelUniqueName: string;
  workerSid: string;
  workspaceSid: string;
  url: string;
}
interface UpdateWorkerChannelResponse {
  success: boolean;
  message?: string;
  workerChannelCapacity: WorkerChannelCapacityResponse;
}

let queues = null as null | Array<Queue>;

class TaskRouterService extends ApiService {
  async updateTaskAttributes(
    taskSid: string,
    attributesUpdate: object
  ): Promise<Boolean> {
    const result = await this.#updateTaskAttributes(
      taskSid,
      JSON.stringify(attributesUpdate)
    );

    return result.success;
  }

  #updateTaskAttributes = (
    taskSid: string,
    attributesUpdate: string
  ): Promise<UpdateTaskAttributesResponse> => {
    const encodedParams: EncodedParams = {
      Token: encodeURIComponent(this.manager.user.token),
      taskSid: encodeURIComponent(taskSid),
      attributesUpdate: encodeURIComponent(attributesUpdate),
    };

    return this.fetchJsonWithReject<UpdateTaskAttributesResponse>(
      `${this.serverlessDomain}/taskrouter/update-task-attributes`,
      {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.buildBody(encodedParams),
      }
    ).then((response): UpdateTaskAttributesResponse => {
      return {
        ...response,
      };
    });
  };
}

export default new TaskRouterService();
