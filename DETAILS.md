## Details

### Prerequisites
Call Recording should be enabled in voice configuration for this plugin to work. Please refer to the screenshot below. Visit [Twilio Console](https://console.twilio.com/us1/develop/flex/manage/voice) to set up the voice configuration.

![Enable Recording Help](https://raw.githubusercontent.com/twilio/flex-plugin-library-pause-recording/main/screenshots/recording_help.png)

### How it works
Plugin is ready to use once it is installed and the browser window is refreshed.
- A Pause call recording button is added to the call canvas during an active call.
- Clicking the pause button stops call recording while the caller may be providing sensitive information such as financial details.
- Agent can toggle the button to resume call recording.

### Installation
During installation, only one field is required:
*TaskRouter Workspace SID*: This is the SID of the "Flex Task Assignment" workspace that you see in [Twilio Console > TaskRouter > Workspaces](https://console.twilio.com/us1/develop/taskrouter/workspaces). Please refer screenshot below:

![Workspace SID Example](https://raw.githubusercontent.com/twilio/flex-plugin-library-pause-recording/main/screenshots/taskrouter.png)
