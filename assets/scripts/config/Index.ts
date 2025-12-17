const dev = window.CC_DEBUG || true; //   && false

export const CONFIG = {
  API_BASE_URL: dev
    ? 'http://127.0.0.1:3002'
    : 'https://puke.liangziaha.online/api', // 打包线上接口
  RESOURCE_BASE_URL: dev
    ? 'http://127.0.0.1:3002/static'
    : 'https://puke.liangziaha.online/static', // 打包线上静态资源
  // /ws 在nginx代理判断用的，/ws后面的随便
  SOCKET_BASE_URL: dev
    ? 'ws://127.0.0.1:3002/ws'
    : 'wss://puke.liangziaha.online/ws', // 打包线上websocket接口
};

export const wechatConfig = {
  wxAppId: dev
    ? 'wx25490d2ddce9d3be'
    : '',
  rewardedVideoID: dev
    ? 'adunit-4271698a7adef832'
    : '',
  interstitialID: dev
    ? 'adunit-49af4bcc1afea2a2'
    : '',
  bannerID: dev
    ? 'adunit-44e0fbf1c6f50f00'
    : ''
};