import { _decorator, Component, Input, input, instantiate, Node, Prefab, SpriteFrame } from 'cc';
import { JoyStickView } from './ui/JoyStickView';
import { ResourceManager } from '../../core/base/ResoureManager';
import { ActorManager } from './actor/ActorManager';
import { BulletManager } from './bullet/BulletManager';
import { ObjectPoolManager } from '../../core/base/ObjectPoolManager';
import { NetworkManager } from '../../core/net/NetworkManager';
import EventManager from '../../core/base/EventManager';
import DataManager from '../../core/base/DataManager';
import { EntityTypeEnum, IClientInput, InputTypeEnum, ApiMsgEnum, EventEnum, PrefabPathEnum, texturePathEnum } from '../../game/common/Enum';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
  private stage: Node
  private ui: Node
  private _shouldUpdate: boolean = false // 是否异步资源加载完成

  protected onLoad(): void {

  }

  protected onDestroy(): void {
  }

  async start() {
    this.clearGame()
    // 测试网络链接
    // await this.connectServer()
    // await this.loadRes()
    await Promise.all([this.connectServer(), this.loadRes()])
    this.initGame()

    // // 初始化地图
    // this.initMap()

    // // 是否加载完成
    // this._shouldUpdate = true
  }

  initGame() {
    // 获取摇杆管理器
    DataManager.instance.jm = this.ui.getComponentInChildren(JoyStickView)
    this.initMap()
    this._shouldUpdate = true

    // 监听帧同步事件
    EventManager.instance.on(EventEnum.ClientSync, this.handleClientSync, this)
    NetworkManager.instance.listenMsg(ApiMsgEnum.MsgServerSync, this.handleServerSync, this)
  }

  clearGame() {
    EventManager.instance.off(EventEnum.ClientSync, this.handleClientSync, this)
    NetworkManager.instance.unlistenMsg(ApiMsgEnum.MsgServerSync, this.handleServerSync, this)
    // 获取场景相关结点
    DataManager.instance.stage = this.stage = this.node.getChildByName('GameLayout')
    this.ui = this.node.getChildByName('GameControl')

    // 销毁场景下所有节点，改成动态添加，方便控制
    this.stage.destroyAllChildren()
  }

  async connectServer() {
    if (!await NetworkManager.instance.connect().catch(() => false)) {
      await new Promise((rs) => setTimeout(rs, 1000))
      await this.connectServer()
    }
  }

  async loadRes() {
    const list = []
    // 加载所有预制体
    for (const type in PrefabPathEnum) {
      const p = ResourceManager.instance.loadRes(PrefabPathEnum[type], Prefab).then((prefab) => {
        DataManager.instance.prefabMap.set(type, prefab)
      })
      list.push(p)
    }

    // 加载所有贴图
    for (const type in texturePathEnum) {
      const p = ResourceManager.instance.loadDir(texturePathEnum[type], SpriteFrame).then((spriteFrames) => {
        console.log('[load texture]', type)
        DataManager.instance.textureMap.set(type, spriteFrames)
      })
      list.push(p)
    }

    // 等待加载完成
    await Promise.all(list)
  }

  initMap() {
    let prefab = DataManager.instance.prefabMap.get(EntityTypeEnum.Map)
    let map = instantiate(prefab)
    map.setParent(this.stage)
  }

  update(deltaTime: number) {
    if (!this._shouldUpdate) return
    this.render()
    this.tick(deltaTime)
  }

  render() {
    this.renderActor()
    this.renderBullet()
  }

  renderActor() {
    for (const data of DataManager.instance.state.actors) {
      let { id, type } = data
      let actorManager = DataManager.instance.actorMap.get(id)
      if (!actorManager) {
        // let prefab = await ResourceManager.instance.loadRes('prefabs/Actor', Prefab) // 防止未加载一直执行
        let prefab = DataManager.instance.prefabMap.get(type)
        let actor = instantiate(prefab)
        actor.setParent(this.stage)
        actorManager = actor.addComponent(ActorManager)
        DataManager.instance.actorMap.set(data.id, actorManager)
        actorManager.init(data)
      } else {
        actorManager.render(data)
      }
    }
  }

  renderBullet() {
    for (const data of DataManager.instance.state.bullets) {
      let { id, type } = data
      let bulletManager = DataManager.instance.bulletMap.get(id)
      if (!bulletManager) {
        // let prefab = await ResourceManager.instance.loadRes('prefabs/Bullet', Prefab) // 防止未加载一直执行
        // let prefab = DataManager.instance.prefabMap.get(type)
        // let bullet = instantiate(prefab)
        // bullet.setParent(this.stage)
        let bullet = ObjectPoolManager.instance.get(type)
        bulletManager = bullet.getComponent(BulletManager) || bullet.addComponent(BulletManager)
        DataManager.instance.bulletMap.set(data.id, bulletManager)
        bulletManager.init(data)
      } else {
        bulletManager.render(data)
      }
    }
  }

  tick(dt) {
    this.tickActor(dt)

    DataManager.instance.applyInput({
      type: InputTypeEnum.TimePast,
      dt
    })
  }

  tickActor(dt) {
    for (const data of DataManager.instance.state.actors) {
      const { id } = data
      let actorManager = DataManager.instance.actorMap.get(id)
      actorManager.tick(dt)
    }
  }


  handleClientSync(input: IClientInput) {
    const msg = {
      input,
      frameId: DataManager.instance.frameId++
    }
    NetworkManager.instance.sendMsg(ApiMsgEnum.MsgClientSync, msg)
  }

  handleServerSync({ inputs }: any) {
    for (const input of inputs) {
      DataManager.instance.applyInput(input)
    }
  }
}


