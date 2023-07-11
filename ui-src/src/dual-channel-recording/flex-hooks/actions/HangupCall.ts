import * as Flex from '@twilio/flex-ui';
import { addMissingCallDataIfNeeded } from '../../helpers/dualChannelHelper';
import { ErrorManager, FlexErrorSeverity, FlexPluginErrorType } from '../../../utils/ErrorManager';

export function handleDualChannelHangupCall(flex: typeof Flex, manager: Flex.Manager) {
  try {
    flex.Actions.addListener('beforeHangupCall', async (payload) => {
      // Listening for this event to at least capture the conference SID
      // if the outbound call is canceled before the called party answers
      addMissingCallDataIfNeeded(payload.task);
    });
  } catch (e) {
    ErrorManager.createAndProcessError(
      "Could not add 'beforeHangupCall' listener",
      {
        type: FlexPluginErrorType.action,
        description: e instanceof Error ? `${e.message}` : "Could not add 'beforeHangupCall' listener",
        context: 'Plugin.Action.beforeHangupCall',
        wrappedError: e,
      },
      'dualchannel',
    );
  }
}
