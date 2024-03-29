// Export the template names as an enum for better maintainability when accessing them elsewhere
export enum StringTemplates {
  DualChannelBroken = 'PSDualChannelBroken',
  RECORDING_PAUSED = 'Call recording is paused.',
  RECORDING_PAUSED_LABEL = 'PSRecordingPausedLabel',
  RESUME_RECORDING = 'Call recording resumed.',
  PAUSE_FAILED = 'PSPauseRecordingFailed',
  RESUME_FAILED = 'PSResumeRecordingFailed',
  PAUSE_TOOLTIP = 'PSPauseRecordingTooltip',
  RESUME_TOOLTIP = 'PSResumeRecordingTooltip',
}

export default {
  [StringTemplates.DualChannelBroken]:
    'The dual channel recording feature will not work because it has not been configured correctly.',
  [StringTemplates.RECORDING_PAUSED]:
    'Call recording has been paused. Please remember to resume call recording when appropriate.',
  [StringTemplates.RECORDING_PAUSED_LABEL]: 'Call Recording Paused',
  [StringTemplates.RESUME_RECORDING]: 'Resumed recording this call.',
  [StringTemplates.PAUSE_FAILED]: 'Failed to pause call recording. Please try again.',
  [StringTemplates.RESUME_FAILED]: 'Failed to resume call recording. Please try again.',
  [StringTemplates.PAUSE_TOOLTIP]: 'Pause Recording',
  [StringTemplates.RESUME_TOOLTIP]: 'Resume Recording',
};
