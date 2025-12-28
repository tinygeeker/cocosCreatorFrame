import { PlatformAdapter } from "./PlatformAdapter";
import { WechatSDK } from "../sdk/WechatSDK";

export class WechatAdapter implements PlatformAdapter {
    async login() {
        return WechatSDK.login();
    }

    async getUserInfo() {
        return WechatSDK.getUserInfo();
    }
}

