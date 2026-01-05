import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
import { NetworkManager } from '../../core/net/NetworkManager';
import { SceneEnum, SocketApiEnum } from '../common/Enum';
import { PlayerManager } from './ui/PlayerManager';
import { RoomManager } from './ui/RoomManager';
const { ccclass, property } = _decorator;

@ccclass('HallManager')
export class HallManager extends Component {
  @property(Node)
  playerContainer: Node

  @property(Prefab)
  playerPrefab: Prefab

  @property(Node)
  roomContainer: Node

  @property(Prefab)
  roomPrefab: Prefab

  protected onLoad(): void {
    NetworkManager.instance.listenMsg(SocketApiEnum.UserAdd, this.renderPlayer, this)
    NetworkManager.instance.listenMsg(SocketApiEnum.UserLeave, this.onLeavePlayer, this)
    NetworkManager.instance.listenMsg(SocketApiEnum.RoomCreate, this.renderRoom, this)
    director.preloadScene(SceneEnum.Room)
  }


  start() {
    this.playerContainer.destroyAllChildren()
    this.roomContainer.destroyAllChildren()
    this.getPlayer()
    this.getRoom()
  }

  protected onDestroy(): void {
    NetworkManager.instance.unlistenMsg(SocketApiEnum.UserAdd, this.renderPlayer, this)
    NetworkManager.instance.unlistenMsg(SocketApiEnum.UserLeave, this.onLeavePlayer, this)
    NetworkManager.instance.unlistenMsg(SocketApiEnum.RoomCreate, this.renderRoom, this)
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

  async getRoom() {
    const data = await NetworkManager.instance.callApi(
      SocketApiEnum.RoomList
    )

    console.log('房间列表', data);
    this.renderRoom(data)
  }

  renderRoom(list) {
    console.log('res', list)
    for (const key in list) {
      let prefab = instantiate(this.roomPrefab)
      prefab.active = false
      prefab.setParent(this.roomContainer)

      prefab.getComponent(RoomManager).init(list[key])
    }
  }

  renderPlayer(list) {
    for (const key in list) {
      let prefab = instantiate(this.playerPrefab)
      prefab.active = false
      prefab.setParent(this.playerContainer)

      prefab.getComponent(PlayerManager).init(list[key])
    }
  }

  async createRoom() {
    const data = await NetworkManager.instance.callApi(
      SocketApiEnum.RoomCreate
    )

    director.loadScene(SceneEnum.Room)
  }

  update(deltaTime: number) {

  }
}


