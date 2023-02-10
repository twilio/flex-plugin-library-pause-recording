import ProgrammableChatService from './ProgrammableChatService';
import managerInstance from '../ApiService'

jest.mock('@twilio/flex-ui', () => {
    return {
        Manager: {
            getInstance:jest.fn()
        }
    }
});
const originalEnv = process.env;
  process.env = {
    ...originalEnv,
    FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN :'https://test-serverless-domain.io',
  };
describe('programmable chat service', () => {
    it('programmable chat service', async () => {
        const channelSid = "CHxxxx";
        const attributes = {
            a: "test",
            b: "test"
        }
        const r = await ProgrammableChatService.updateChannelAttributes(channelSid, attributes)
    })
})