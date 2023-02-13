import * as Flex from "@twilio/flex-ui";
import { addMissingCallDataIfNeeded } from "../../helpers/dualChannelHelper";
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from "../../../utils/ErrorManager";

export function handleDualChannelCompleteTask(
  flex: typeof Flex,
  manager: Flex.Manager
) {
  try{
  flex.Actions.addListener("beforeCompleteTask", async (payload) => {
    // Listening for this event as a last resort check to ensure call
    // and conference metadata are captured on the task
    addMissingCallDataIfNeeded(payload.task);
  });
  }catch(e){
    ErrorManager.createAndProcessError("Could not add 'beforeCompleteTask' listener", {
      type: FlexPluginErrorType.action,
      description: e instanceof Error ? `${e.message}` : "Could not add 'beforeCompleteTask' listener",
      context: "Plugin.Action.beforeCompleteTask",
      wrappedError: e,
  },     
  "dualchannel"
  );
  }
}
