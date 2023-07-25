import RecordingService from '../RecordingService';
import * as Flex from '@twilio/flex-ui';
import fetch from 'jest-fetch-mock';

const callSid = '1234';
const conferenceSid = 'CSXXXXX';
const pauseBehavior = 'paused';
const recordingSid = '1111';
describe('startDualChannelRecording', () => {
  beforeAll(() => {
    fetch.enableMocks();
  });
  it('calling startDualChannelRecording', () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockResponseOnce(JSON.stringify({ callSid: 'CSxxxxxx' }));

    RecordingService.startDualChannelRecording(callSid);
  });

  it('failing startDualChannelRecording', async () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockReject(new Error('mock error'));

    await RecordingService.startDualChannelRecording(callSid).catch((err) => {
      expect(err.message).toEqual('mock error');
    });
    fetch.resetMocks();
  });

  it('calling pauseCallRecording', () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockResponseOnce(JSON.stringify({ callSid: 'CSxxxxxx' }));

    RecordingService.pauseCallRecording(callSid, 'ongoing');
  });

  it('failing pauseCallRecording', async () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockReject(new Error('mock error'));

    await RecordingService.pauseCallRecording(callSid, 'ongoing').catch((err) => {
      expect(err.message).toEqual('mock error');
    });
    fetch.resetMocks();
  });

  it('calling resumeCallRecording', () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockResponseOnce(JSON.stringify({ callSid: 'CSxxxxxx' }));

    RecordingService.resumeCallRecording(callSid, recordingSid);
  });

  it('failing resumeCallRecording', async () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockReject(new Error('mock error'));

    await RecordingService.resumeCallRecording(callSid, recordingSid).catch((err) => {
      expect(err.message).toEqual('mock error');
    });
    fetch.resetMocks();
  });

  it('calling pauseConferenceRecording', () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockResponseOnce(JSON.stringify({ callSid: 'CSxxxxxx' }));

    RecordingService.pauseConferenceRecording(conferenceSid, pauseBehavior);
  });

  it('failing pauseConferenceRecording', async () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockReject(new Error('mock error'));

    await RecordingService.pauseConferenceRecording(conferenceSid, pauseBehavior).catch((err) => {
      expect(err.message).toEqual('mock error');
    });
    fetch.resetMocks();
  });

  it('calling resumeConferenceRecording', () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockResponseOnce(JSON.stringify({ callSid: 'CSxxxxxx' }));

    RecordingService.resumeConferenceRecording(conferenceSid, recordingSid);
  });

  it('failing resumeConferenceRecording', async () => {
    const flex: typeof Flex = Flex;
    const manager: Flex.Manager = Flex.Manager.getInstance();
    fetch.mockReject(new Error('mock error'));

    await RecordingService.resumeConferenceRecording(conferenceSid, recordingSid).catch((err) => {
      expect(err.message).toEqual('mock error');
    });
    fetch.resetMocks();
  });
});
