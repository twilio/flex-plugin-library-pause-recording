//const { enabled = false, indicator_permanent = false, indicator_banner = false, include_silence = false } = getFeatureFlags()?.features?.pause_recording || {};
const enabled = true;
const indicator_permanent = true;
const indicator_banner = true;
const include_silence = true;
export const isFeatureEnabled = () => {
  return enabled;
};

export const isBannerIndicatorEnabled = () => {
  return enabled && indicator_banner;
};

export const isPermanentIndicatorEnabled = () => {
  return enabled && indicator_permanent;
};

export const isIncludeSilenceEnabled = () => {
  return enabled && include_silence;
};
