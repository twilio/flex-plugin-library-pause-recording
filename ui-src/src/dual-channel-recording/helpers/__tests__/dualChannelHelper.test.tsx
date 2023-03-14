//import {addCallDataToTask, waitForConferenceParticipants, waitForActiveCall, addMissingCallDataIfNeeded} from './dualChannelHelper'
import * as dualChannel from '../dualChannelHelper';
import { ConferenceParticipant, ITask, Manager, TaskHelper } from "@twilio/flex-ui";
import React from 'react';
import { FetchedRecording } from "../../../types/serverless/twilio-api";
import fetch from 'jest-fetch-mock';
import { Participant } from 'twilio-video';
import TaskRouterService from "../../../utils/serverless/TaskRouter/TaskRouterService";

const taskStatus_cancelled = "canceled";
const taskStatus_running = "ongoing";
const callSid = "11111";
describe('addMissingCallDataIfNeeded', ()=>{

    it('checking isOutboundCallTask functionality returns true', ()=>{
    const mockTask = {
        attributes: {conference : '12345'}
    }
    const { attributes } = mockTask;
    const { conference } = attributes;
    jest.spyOn(TaskHelper, 'isOutboundCallTask').mockImplementation(() => true);

    const listenerSpy1 = jest.spyOn(TaskHelper, 'isOutboundCallTask');
    const listenerSpy2 = jest.spyOn(dualChannel, 'addCallDataToTask');
    console.log(!conference);
    const function_name = dualChannel.addMissingCallDataIfNeeded(mockTask);
    expect(listenerSpy1).toHaveBeenCalledTimes(1);
    expect(listenerSpy2).toHaveBeenCalledTimes(0);

    })


    it('checking isOutboundCallTask functionality returns false', ()=>{
        const mockTask = {
            attributes: {conference : '12345'}
        }
        const { attributes } = mockTask;
        const { conference } = attributes;
        jest.spyOn(TaskHelper, 'isOutboundCallTask').mockImplementation(() => false);

        const listenerSpy1 = jest.spyOn(TaskHelper, 'isOutboundCallTask');
        const listenerSpy2 = jest.spyOn(dualChannel, 'addCallDataToTask');
        console.log(!conference);
        const function_name = dualChannel.addMissingCallDataIfNeeded(mockTask);
        expect(listenerSpy1).toHaveBeenCalledTimes(1);
        expect(listenerSpy2).toHaveBeenCalledTimes(0);
    

        })
})

describe('waitForActiveCall', ()=>{
    it('waitForActiveCall resolve task status ongoing',async ()=>{
        jest.useFakeTimers();
        const mockTask = {
            sid: '123456',
            taskStatus: taskStatus_running
        }
        const actionSpy = jest.spyOn(dualChannel, 'waitForActiveCall');
        dualChannel.waitForActiveCall(mockTask);
        jest.advanceTimersByTime(60000);
        // expect(actionSpy).
        jest.clearAllTimers();
    })
    it('waitForActiveCall resolve task status cancelled',()=>{
        jest.useFakeTimers();
        const mockTask = {
            sid: '123456',
            taskStatus: taskStatus_cancelled
        }
        dualChannel.waitForActiveCall(mockTask);
        jest.advanceTimersByTime(5000);
        jest.clearAllTimers();
    })
})


describe('waitForConferenceParticipants', ()=>{
    it('waitForConferenceParticipants resolve task status ongoing',()=>{
        jest.useFakeTimers();
        const mockTask = {
            sid: '123456',
            taskStatus: taskStatus_running,
            conference : {participants : ['worker','customer','123','12334']}
        }
        dualChannel.waitForConferenceParticipants(mockTask);
        jest.advanceTimersByTime(5000);
        jest.clearAllTimers();
    })

    it('waitForConferenceParticipants resolve task status cancelled',()=>{
        jest.useFakeTimers();
        const mockTask = {
            sid: '123456',
            taskStatus: taskStatus_cancelled,
            conference : {participants : ['worker','customer','123','12334']}
        }
        dualChannel.waitForConferenceParticipants(mockTask);
        jest.advanceTimersByTime(5000);
        jest.clearAllTimers();
    })

    it('waitForConferenceParticipants conference undefined return nothing',()=>{
        jest.useFakeTimers();
        const mockTask = {
        }
        dualChannel.waitForConferenceParticipants(mockTask);
        jest.advanceTimersByTime(5000);
        jest.clearAllTimers();
    })

    it('waitForConferenceParticipants resolve task status cancelled',()=>{
        jest.useFakeTimers();
        const mockTask = {
            sid: '123456',
            taskStatus: taskStatus_cancelled,
            conference : {participants : ['worker']}
        }
        dualChannel.waitForConferenceParticipants(mockTask);
        jest.advanceTimersByTime(5000);
        jest.clearAllTimers();
    })
    
})

describe("addCallDataToTask",()=>{
    beforeAll(() => {
        fetch.enableMocks();
      });
    it('addCallDataToTask',()=>{
        const mockTask = {
            attributes: ["1","2"],
            conference: taskStatus_cancelled,
        }
        fetch.mockResponseOnce(JSON.stringify({ callSid: 'CSxxxxxx' }));
        const spyMethod = jest.spyOn(TaskRouterService, 'updateTaskAttributes');
        jest.spyOn(TaskHelper, 'isOutboundCallTask').mockImplementation(() => true);
        const listenerSpy1 = jest.spyOn(TaskHelper, 'isOutboundCallTask');
        const recording = { sid: "1232123" }
        dualChannel.addCallDataToTask(mockTask, callSid, recording);
        expect(spyMethod).toHaveBeenCalled();

    })
})
