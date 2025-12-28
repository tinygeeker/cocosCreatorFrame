import { PlatformAdapter } from "./adapter/PlatformAdapter";
import { WechatAdapter } from "./adapter/WechatAdapter";
import { WebAdapter } from "./adapter/WebAdapter";

export class PlatformManager {
    static adapter: PlatformAdapter;

    static init() {
        if (typeof wx !== "undefined") {
            this.adapter = new WechatAdapter();
        } else {
            this.adapter = new WebAdapter();
        }
    }
}

