import * as Flex from "@twilio/flex-ui";
import { FlexEvent } from "../../../types/manager/FlexEvent";

const pluginsLoadedHandler = (flexEvent: FlexEvent) => {
  console.log(`Feature enabled: pause-recording`);
};

export default pluginsLoadedHandler;
