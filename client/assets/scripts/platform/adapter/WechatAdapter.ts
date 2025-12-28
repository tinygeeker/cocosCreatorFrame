import { PlatformAdapter } from "./PlatformAdapter";
import { WechatAuth } from "../sdk/wechat/WechatAuth";

export class WechatAdapter implements PlatformAdapter {
    async login() {
        return WechatAuth.login();
    }

    async getUserInfo() {
        return WechatAuth.getUserInfo();
    }
}

