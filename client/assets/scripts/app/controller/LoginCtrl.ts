import { PlatformManager } from "../../platform/PlatformManager";

export class LoginCtrl {
    async login() {
        const res = await PlatformManager.adapter.login();

        // 拿 token → 你的 WS / HTTP 登录
        console.log("login ok", res);
    }
}