const dev = window.CC_DEBUG || true;

export const networkConfig = {
  apiBaseUrl: dev
    ? 'http://127.0.0.1:3002'
    : 'https://puke.tinygeeker.online/api',
  resourceBaseUrl: dev
    ? 'http://127.0.0.1:3002/static'
    : 'https://puke.tinygeeker.online/static',
  socketBaseUrl: dev
    ? 'ws://127.0.0.1:2345'
    : 'wss://puke.tinygeeker.online/ws',
};