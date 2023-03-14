import * as pauseRecordingHelper from '../pauseRecordingHelper';
import * as Flex from '@twilio/flex-ui';
import RecordingService from "../RecordingService";
import fetch from 'jest-fetch-mock';

const recording = {
    sid : '123456'
}

// jest.mock('../../dual-channel-recording', ()=>{
//     return {
//         isDualChannelEnabled : jest.fn().mockReturnValue(false),
//         // waitForConferenceParticipants : jest.fn().mockReturnValue(['worker',{participantType : 'customer', callSid : '123'},'123','12334'])
//     }
//   }) ;

describe('pauseRecordingHelper',()=>{
   
    it('pauseRecording',async()=>{
        fetch.mockResponseOnce(JSON.stringify({ data: 'Mock data' }));

        let flex: typeof Flex = Flex;
        let manager: Flex.Manager = Flex.Manager.getInstance();
        RecordingService.pauseConferenceRecording = jest.fn().mockReturnValue(recording)
        // RecordingService.pauseCallRecording = jest.fn().mockImplementation
        // console.log(RecordingService.pauseCallRecording('111',"silence"))
        // let spy = jest.spyOn(RecordingService, 'pauseCallRecording').mockReturnValue(recording);
        const mockTask = {conference :
            { participants : ['worker',{
                participantType : 'customer'
                },'123','12334',],
              conferenceSid : '111',
            },
            sid : '111'
        }
        // let actionSpy = jest.spyOn(pauseRecordingHelper, 'pauseRecording')
        const x = await pauseRecordingHelper.pauseRecording(mockTask);
        expect(x).toBe(true)
        fetch.resetMocks();

    })

    it('pauseRecording',async()=>{
        fetch.mockResponseOnce(JSON.stringify({ data: 'Mock data' }));

        let flex: typeof Flex = Flex;
        let manager: Flex.Manager = Flex.Manager.getInstance();
        RecordingService.pauseConferenceRecording = jest.fn().mockReturnValue(recording)
        // RecordingService.pauseCallRecording = jest.fn().mockImplementation
        // console.log(RecordingService.pauseCallRecording('111',"silence"))
        // let spy = jest.spyOn(RecordingService, 'pauseCallRecording').mockReturnValue(recording);
        const mockTask = {conference :
            { participants : ['worker',{
                participantType : 'customer'
                },'123','12334',],
              conferenceSid : '111',
            },
            sid : '123'
        }
        // let actionSpy = jest.spyOn(pauseRecordingHelper, 'pauseRecording')
        const x = await pauseRecordingHelper.pauseRecording(mockTask);
        expect(x).toBe(false)
        fetch.resetMocks();

    })

    it('resumeRecording',async()=>{
        fetch.mockResponseOnce(JSON.stringify({ data: 'Mock data' }));

        let flex: typeof Flex = Flex;
        let manager: Flex.Manager = Flex.Manager.getInstance();
        RecordingService.resumeConferenceRecording = jest.fn().mockReturnValue(recording)
        const mockTask = {conference :
            { participants : ['worker',{
                participantType : 'customer'
                },'123','12334',],
              conferenceSid : '111',
            },
            sid : '123'
        }
        // let actionSpy = jest.spyOn(pauseRecordingHelper, 'pauseRecording')
        const x = await pauseRecordingHelper.resumeRecording(mockTask);
        expect(x).toBe(true)
        fetch.resetMocks();

    })

    it('resumeRecording',async()=>{
        fetch.mockResponseOnce(JSON.stringify({ data: 'Mock data' }));

        let flex: typeof Flex = Flex;
        let manager: Flex.Manager = Flex.Manager.getInstance();
        RecordingService.resumeConferenceRecording = jest.fn().mockReturnValue(recording)
        const mockTask = {conference :
            { participants : ['worker',{
                participantType : 'customer'
                },'123','12334',],
              conferenceSid : '111',
            },
            sid : '111'
        }
        // let actionSpy = jest.spyOn(pauseRecordingHelper, 'pauseRecording')
        const x = await pauseRecordingHelper.resumeRecording(mockTask);
        expect(x).toBe(false)
        fetch.resetMocks();

    })
})
