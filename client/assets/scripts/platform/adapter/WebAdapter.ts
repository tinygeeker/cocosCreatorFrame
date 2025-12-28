import { PlatformAdapter } from "./PlatformAdapter";

export class WebAdapter implements PlatformAdapter {
    async login() {
        return {
            uid: "test_001",
            token: "debug_token"
        };
    }

    async getUserInfo() {
        return { nickName: "Dev" };
    }
}
