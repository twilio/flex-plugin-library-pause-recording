import DualChannelNotification from './DualChannelRecording';
import * as Flex from "@twilio/flex-ui"

describe('Dual Channel Recording Notification', () => {
    let flex: typeof Flex = Flex;
    let manager: Flex.Manager = Flex.Manager.getInstance();
    const notificationSpy = jest.spyOn(Flex.Notifications, 'registerNotification');
    it('sends dual channel recording notification', () => {
        //const registerNotificationSpy = jest.spyOn(Flex.Notifications, 'registerNotification');
        DualChannelNotification(flex, manager);
        expect(notificationSpy).toHaveBeenCalled();
        expect(notificationSpy).toHaveBeenCalledWith({
            id: 'PSDualChannelBroken',
            closeButton: true,
            content: 'PSDualChannelBroken',
            timeout: 0,
            type: 'error',
        });
    })
})