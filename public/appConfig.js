// your account sid
var accountSid = 'AC8dbcd5914baded5b6f984d2e4b872f8a';
var env = 'prod';

function getAppConfig(env) {
  if (env === 'dev' || env === 'stage') {
    return {
      warmTransfers: {
        enabled: true,
      },
      pluginService: {
        enabled: true,
        url: '/plugins',
      },
      sso: {
        accountSid: accountSid,
      },
      ytica: false,
      logLevel: 'info',
      chatOrchestrationServiceUrl: `https://preview.${env}.twilio.com/Flex/WebChannels`,
      showSupervisorDesktopView: true,
      flexConfigServiceUrl: `https://flex-api.${env}.twilio.com/v1/Configuration`,
      twilioServiceLoginUrl: `https://flex.${env}.twilio.com/admin`,
      sessionUrl: `https://flex.${env}.twilio.com/api/v1/Session`,
      sdkOptions: {
        insights: {
          logLevel: 'error',
          region: `${env}-us1`,
          productId: 'flex_insights',
        },
        chat: {
          region: `${env}-us1`,
          logLevel: 'error',
        },
        worker: {
          wsServer: `wss://event-bridge.${env}-us1.twilio.com/v1/wschannels`,
          ebServer: `https://event-bridge.${env}-us1.twilio.com/v1/wschannels`,
        },
        voice: {
          eventgw: `eventgw.${env}.twilio.com`,
          chunderw: `chunderw-vpc-gll.${env}.twilio.com`,
        },
      },
    };
  }

  return {
    pluginService: {
      enabled: true,
      url: '/plugins',
    },
    sso: {
      accountSid: accountSid,
    },
    ytica: false,
    logLevel: 'info',
    showSupervisorDesktopView: true,
  };
}

var appConfig = getAppConfig(env);