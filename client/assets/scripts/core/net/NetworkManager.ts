import { _decorator, resources, Asset } from "cc";
import SingletonManager from "../base/SingletonManager";

interface IItem {
    cb: Function;
    ctx: unknown;
}

interface ICallApiRet {
    success: boolean;
    res?: any;
    error?: Error
}


export class NetworkManager extends SingletonManager {
    private _ws: WebSocket
    isConnect: boolean = false
    private map: Map<string, Array<IItem>> = new Map();

    static get instance() {
        return super.getInstance<NetworkManager>();
    }

    connect() {
        return new Promise((resolve, reject) => {
            if (this.isConnect) {
                resolve(true)
                return
            }

            this._ws = new WebSocket('ws://127.0.0.1:2345')
            this._ws.onopen = () => {
                this.isConnect = true
                resolve(true)
            }
            this._ws.onclose = () => {
                this.isConnect = false
                reject(false)
            }
            this._ws.onerror = (e) => {
                this.isConnect = false
                console.error('[websocket/onerror]', e)
                reject(false)
            }
            this._ws.onmessage = (e) => {
                console.log('[websocket/onmessage成功]', e.data)
                try {
                    let { cmd, data } = JSON.parse(e.data)
                    if (this.map.has(cmd)) {
                        this.map.get(cmd).forEach(({ cb, ctx }) => {
                            // 这里区分apply和call作用，apply传数组
                            // cb.apply(ctx, data);
                            cb.call(ctx, data);
                        });
                    }
                } catch (e) {
                    console.log('[websocket/onmessage失败]', e)
                }
            }
        })
    }

    callApi(name: string, data): Promise<ICallApiRet> {
        return new Promise((resolve) => {
            try {
                const timer = setTimeout(() => {
                    resolve({
                        success: false,
                        error: new Error('time out!')
                    })
                    this.unlistenMsg(name, cb, null)
                }, 5000);
                const cb = (res) => {
                    resolve(res)
                    clearTimeout(timer)
                    this.unlistenMsg(name, cb, null)
                }

                this.listenMsg(name, cb, null)
                this.sendMsg(name, data)
            } catch (error) {
                resolve({
                    success: false,
                    error
                })
            }
        })
    }

    sendMsg(cmd: string, data) {
        const msg = {
            cmd,
            data
        }
        this._ws.send(JSON.stringify(msg))
    }

    listenMsg(name: string, cb: Function, ctx: unknown) {
        if (this.map.has(name)) {
            this.map.get(name).push({ cb, ctx });
        } else {
            this.map.set(name, [{ cb, ctx }]);
        }
    }

    unlistenMsg(name: string, cb: Function, ctx: unknown) {
        if (this.map.has(name)) {
            const index = this.map.get(name).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(name).splice(index, 1);
        }
    }
}
