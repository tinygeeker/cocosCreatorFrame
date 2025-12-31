import { _decorator, Component, director, EditBox, Node } from 'cc';
import { NetworkManager } from '../../core/net/NetworkManager';
import { ApiMsgEnum } from '../../game/common/Enum';
import DataManager from '../../core/base/DataManager';
const { ccclass, property } = _decorator;

@ccclass('LoginManager')
export class LoginManager extends Component {
    input: EditBox

    protected onLoad(): void {
        this.input = this.node.getComponentInChildren(EditBox)
    }

    async start() {
        await NetworkManager.instance.connect()
    }

    async handleClick() {
        if (!NetworkManager.instance.isConnect) {
            await NetworkManager.instance.connect()
            return
        }

        const nickname = this.input.string
        if (!nickname) {
            console.error('请输入账号')
            return
        }

        const { success, error, res } = await NetworkManager.instance.callApi(ApiMsgEnum.ApiPlayerJoin, {
            nickname
        })

        if (!success) {
            console.error(error)
            return
        }

        DataManager.instance.myPlayerId = res.id

        director.loadScene('NetScence')
    }

    update(deltaTime: number) {
    }
}


