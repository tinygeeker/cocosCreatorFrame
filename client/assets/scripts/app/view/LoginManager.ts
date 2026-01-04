import { _decorator, Component, director, EditBox, Node } from 'cc';
import { NetworkManager } from '../../core/net/NetworkManager';
import { SceneEnum, SocketApiEnum } from '../../app/common/Enum';
import DataManager from '../../core/base/DataManager';
const { ccclass, property } = _decorator;

@ccclass('LoginManager')
export class LoginManager extends Component {
  input: EditBox

  protected onLoad(): void {
    this.input = this.node.getComponentInChildren(EditBox)
    director.preloadScene(SceneEnum.Hall)
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

    const { code, msg, data } = await NetworkManager.instance.callApi(
      SocketApiEnum.UserLogin,
      { nickname }
    )

    if (200 !== code) {
      console.error(msg)
      return
    }

    DataManager.instance.myPlayerId = data.id

    director.loadScene(SceneEnum.Hall)
  }

  update(deltaTime: number) {
  }
}


