// add-feature-script: type imports
import DualChannelRecordingConfig from "../../dual-channel-recording/types/ServiceConfiguration";
import PauseRecordingConfig from "../../pause-recording/types/ServiceConfiguration";

export default interface FeatureServiceConfiguration {
  dual_channel_recording: DualChannelRecordingConfig;
  pause_recording: PauseRecordingConfig;
  // add-feature-script: add config definitions above this line
}
