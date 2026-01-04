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
    NetworkManager.instance.listenMsg(SocketApiEnum.UserList, this.getPlayer, this)
    this.playerContainer.destroyAllChildren()
    // this.getPlayer()
  }

  protected onDestroy(): void {
    NetworkManager.instance.unlistenMsg(SocketApiEnum.UserList, this.getPlayer, this)
  }


  // async getPlayer() {
  //   const { code, msg, data } = await NetworkManager.instance.callApi(
  //     SocketApiEnum.UserList
  //   )

  //   if (200 !== code) {
  //     console.error(msg)
  //     return
  //   }

  //   console.log('用户列表', data);
  //   this.render(data)
  // }

  getPlayer(res) {
    const { data } = res
    this.render(data)
  }

  render(list) {
    console.log('dddd', list)
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


