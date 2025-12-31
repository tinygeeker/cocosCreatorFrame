import { _decorator, Component, director, instantiate, Node, ProgressBar } from 'cc';
import { IActor } from '../../common/Type';
import { EntityManager } from '../../../core/base/EntityManager';
import { ActorStateMachine } from './ActorStateMachine';
import { WeaponManager } from '../weapon/WeaponManager';
import { EntityTypeEnum, InputTypeEnum, EntityStateEnum, EventEnum } from '../../common/Enum';
import EventManager from '../../../core/base/EventManager';
import DataManager from '../../../core/base/DataManager';
const { ccclass, property } = _decorator;

@ccclass('ActorManager')
export class ActorManager extends EntityManager {
  bulletType: EntityTypeEnum
  private wm: WeaponManager
  private id: number
  private hp: ProgressBar

  protected onLoad(): void {
  }

  init(data: IActor) {
    this.id = data.id
    this.hp = this.node.getComponentInChildren(ProgressBar)
    this.bulletType = data.bulletType
    // 初始化状态机,这里不是很懂，做人物状态机（目的：让人物播放对应的动画）
    this.fsm = this.addComponent(ActorStateMachine)
    this.fsm.init(data.type)
    this.state = EntityStateEnum.Idle

    // 初始化武器
    const prefab = DataManager.instance.prefabMap.get(EntityTypeEnum.Weapon1)
    const weapon = instantiate(prefab)
    weapon.setParent(this.node)
    this.wm = weapon.addComponent(WeaponManager)
    this.wm.init(data)
  }

  render(data: IActor) {
    // 渲染人物位置
    const { direction, position } = data
    this.node.setPosition(position.x, position.y)

    // 渲染人物朝向/血条朝向
    if (direction.x !== 0) {
      this.node.setScale(direction.x > 0 ? 1 : -1, 1)
      this.hp.node.setScale(direction.x > 0 ? 1 : -1, 1)
    }

    // 不能直接用正切，否则翻转反方向的时候，计算会错误
    // const rad = Math.atan(direction.y / direction.x)

    // 渲染武器朝向
    const side = Math.sqrt(direction.x ** 2 + direction.y ** 2)
    const rad = Math.asin(direction.y / side)
    const angle = (rad / Math.PI) * 180
    this.wm.node.setRotationFromEuler(0, 0, angle)

    // 渲染血条
    this.hp.progress = data.hp / this.hp.totalLength
  }

  start() {

  }

  tick(deltaTime: number) {
    if (this.id !== DataManager.instance.myPlayerId) return // 只能操作自己位置

    // 当摇杆移动时，更新用户的位置状态
    if (DataManager.instance.jm.input.length()) {
      const { x, y } = DataManager.instance.jm.input

      // 实现帧同步
      EventManager.instance.emit(EventEnum.ClientSync, {
        id: 1,
        type: InputTypeEnum.ActorMove,
        direction: { x, y },
        deltaTime
      })

      // DataManager.instance.applyInput({
      //   id: 1,
      //   type: InputTypeEnum.ActorMove,
      //   direction: { x, y },
      //   deltaTime
      // })

      this.state = EntityStateEnum.Run // 切换动画
      // console.log(DataManager.instance.state.actors[0])
    } else {
      this.state = EntityStateEnum.Idle // 切换动画
    }
  }
}


