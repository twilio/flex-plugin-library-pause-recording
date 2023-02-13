import * as Flex from '@twilio/flex-ui';
import { NotificationType } from '@twilio/flex-ui';
import { StringTemplates } from './StringTemplate';

export enum NotificationIds {
  DualChannelBroken = 'PSDualChannelBroken',
  PAUSE_FAILED = 'PSPauseFailed',
  RESUME_FAILED = 'PSResumeFailed',
}

export default (flex: typeof Flex, manager: Flex.Manager) => {
  dualChannelBroken(flex, manager);
  pauseRecordingFailed(flex, manager);
  resumeRecordingFailed(flex, manager);

};

function dualChannelBroken(flex: typeof Flex, manager: Flex.Manager) {
  flex.Notifications.registerNotification({
    id: NotificationIds.DualChannelBroken,
    closeButton: true,
    content: StringTemplates.DualChannelBroken,
    timeout: 0,
    type: NotificationType?.error,
  });
}


function pauseRecordingFailed (flex: typeof Flex, manager: Flex.Manager) {
    flex.Notifications.registerNotification({
        id: NotificationIds.PAUSE_FAILED,
        closeButton: true,
        content: StringTemplates.PAUSE_FAILED,
        type: NotificationType?.error,
        timeout: 3000
      });
}
   
function resumeRecordingFailed (flex: typeof Flex, manager: Flex.Manager) {
    flex.Notifications.registerNotification({
        id: NotificationIds.RESUME_FAILED,
        closeButton: true,
        content: StringTemplates.RESUME_FAILED,
        type: NotificationType?.error,
        timeout: 3000
      });
}
    
