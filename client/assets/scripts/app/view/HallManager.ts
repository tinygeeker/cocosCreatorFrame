import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { NetworkManager } from '../../core/net/NetworkManager';
import { SocketApiEnum } from '../common/Enum';
import { PlayerManager } from './ui/PlayerManager';
const { ccclass, property } = _decorator;

@ccclass('HallManager')
export class HallManager extends Component {
  @property(Node)
  playerContainer: Node

  @property(Prefab)
  playerPrefab: Prefab


  start() {
    NetworkManager.instance.listenMsg(SocketApiEnum.UserAdd, this.renderPlayer, this)
    NetworkManager.instance.listenMsg(SocketApiEnum.UserLeave, this.onLeavePlayer, this)
    this.playerContainer.destroyAllChildren()
    this.getPlayer()
  }

  protected onDestroy(): void {
    NetworkManager.instance.unlistenMsg(SocketApiEnum.UserAdd, this.renderPlayer, this)
    NetworkManager.instance.unlistenMsg(SocketApiEnum.UserLeave, this.onLeavePlayer, this)
  }


  async getPlayer() {
    const data = await NetworkManager.instance.callApi(
      SocketApiEnum.UserList
    )

    console.log('用户列表', data);
    this.renderPlayer(data)
  }

  onLeavePlayer(data) {
    this.playerContainer.destroyAllChildren()
    this.renderPlayer(data)
  }

  renderPlayer(list) {
    for (const key in list) {
      let prefab = instantiate(this.playerPrefab)
      prefab.active = false
      prefab.setParent(this.playerContainer)

      prefab.getComponent(PlayerManager).init(list[key])
    }
  }

  update(deltaTime: number) {

  }
}


