import PauseRecordingNotification from './PauseRecording';
import * as Flex from "@twilio/flex-ui"

describe('Pause Recording Notification', () => {
    let flex: typeof Flex = Flex;
    it('sends pause recording notification', () => {
        const registerNotificationSpy = jest.spyOn(Flex.Notifications, 'registerNotification');
        PauseRecordingNotification(flex);
        expect(flex.Notifications.registerNotification).toHaveBeenCalledTimes(4);
    })
})