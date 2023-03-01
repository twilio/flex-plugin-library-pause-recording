import * as Flex from "@twilio/flex-ui";
import { pause } from "pause-recording/flex-hooks/states/PauseRecordingSlice";
import  dualChannelBroken from '../dual-channel-recording/flex-hooks/notifications/DualChannelRecording'
import * as pauseRecording from '../pause-recording/flex-hooks/notifications/PauseRecording'
import {NotificationIds} from './NotificationManager'
export enum FlexPluginErrorType {
    action = "ActionFramework",
    serverless = "Serverless",
    programabelComponents = "ProgramableComponents"    
}

export enum FlexErrorSeverity {
    normal = "normal",
    severe = "severe"
}

export type FlexPluginErrorContents = {
    type?: FlexPluginErrorType | string;
    wrappedError?: Error | string | unknown;
    context?: string;
    description?: string;
    severity?: FlexErrorSeverity;
};

export class FlexPluginError extends Error {

    public content: FlexPluginErrorContents & {
        type: FlexPluginErrorType | string;
        severity: FlexErrorSeverity;
    };

    public time: Date;

    constructor(message: string, content: FlexPluginErrorContents = {}) {
        super(message);
        this.content = {
            ...content,
            type: content.type || "PauseRecording",
            severity: content.severity || FlexErrorSeverity.normal,
        };
        this.time = new Date();
        Object.setPrototypeOf(this, FlexPluginError.prototype);
    }
}

class ErrorManagerImpl {

    public processErrorDualChannel(error: FlexPluginError, showNotification: boolean): FlexPluginError {
        try {
            console.log(`Pause Recording Plugin: ${error}\nType: ${error.content.type}\nContext:${error.content.context}`);
            if (showNotification) {
                Flex.Notifications.showNotification(
                    NotificationIds.DualChannelBroken,
                        {
                            error: error
                        }
                );
            }
        } catch (e) {
            // Do not throw, let's avoid Inceptions
        }

        return error;
    }

    public processErrorPauseRecording(error: FlexPluginError, showNotification: boolean): FlexPluginError {
        try {
            console.log(`Pause Recording Plugin: ${error}\nType: ${error.content.type}\nContext:${error.content.context}`);
            if (showNotification) {
                Flex.Notifications.showNotification(
                    NotificationIds.PAUSE_FAILED,
                        {
                            error: error
                        }
                );
            }
        } catch (e) {
            // Do not throw, let's avoid Inceptions
        }

        return error;
    }

    public createAndProcessError(message: string, content: FlexPluginErrorContents = {},pluginType: string, showNotification: boolean = true): FlexPluginError {
        const error = new FlexPluginError(message, content);
        if(pluginType === "dualchannel")
            return this.processErrorDualChannel(error, showNotification);
        else{
            return this.processErrorPauseRecording(error, showNotification)
        }
    }
}

export const ErrorManager = new ErrorManagerImpl();