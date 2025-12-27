import { _decorator, resources, Asset } from "cc";
import SingletonManager from "../base/SingletonManager";

interface IItem {
    cb: Function;
    ctx: unknown;
}


export class NetworkManager extends SingletonManager {
    private _ws: WebSocket
    private map: Map<string, Array<IItem>> = new Map();

    static get instance() {
        return super.GetInstance<NetworkManager>();
    }

    connect() {
        return new Promise((resolve, reject) => {
            this._ws = new WebSocket('ws://127.0.0.1:2345')
            this._ws.onopen = () => {
                resolve(true)
            }
            this._ws.onclose = () => {
                reject(false)
            }
            this._ws.onerror = (e) => {
                console.error('[websocket/onerror]', e)
                reject(false)
            }
            this._ws.onmessage = (e) => {
                console.log('[websocket/onmessage成功]', e.data)
                try {
                    let { name, data } = JSON.parse(e.data)
                    if (this.map.has(name)) {
                        this.map.get(name).forEach(({ cb, ctx }) => {
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

    sendMsg(name: string, data) {
        const msg = {
            name,
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
