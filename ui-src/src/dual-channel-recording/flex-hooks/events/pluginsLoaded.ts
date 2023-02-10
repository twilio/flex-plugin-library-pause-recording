import * as Flex from "@twilio/flex-ui";
import { FlexEvent } from "../../../types/manager/FlexEvent";
import { NotificationIds } from "../notifications/DualChannelRecording";

const pluginsLoadedHandler = (flexEvent: FlexEvent) => {

  console.log(`Feature enabled: dual-channel-recording`);
  
};

export default pluginsLoadedHandler;
