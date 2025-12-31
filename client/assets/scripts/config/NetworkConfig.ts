const dev = window.CC_DEBUG || true;

export const NetworkConfig = {
  API_BASE_URL: dev
    ? 'http://127.0.0.1:3002'
    : 'https://puke.tinygeeker.online/api',
  RESOURCE_BASE_URL: dev
    ? 'http://127.0.0.1:3002/static'
    : 'https://puke.tinygeeker.online/static',
  SOCKET_BASE_URL: dev
    ? 'ws://127.0.0.1:2345'
    : 'wss://puke.tinygeeker.online/ws',
};