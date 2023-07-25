//const { enabled = false, channel } = getFeatureFlags()?.features?.dual_channel_recording || {};
const enabled = true;
const channel = 'customer';
export const isFeatureEnabled = () => {
  return enabled;
};

export const getChannelToRecord = () => {
  return channel;
};
