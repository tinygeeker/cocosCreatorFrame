import { _decorator, Component, director, instantiate, Node, Vec2 } from 'cc';
import DataManager from '../../core/utils/DataManager';
import { EntityManager } from '../../core/utils/EntityManager';
import { BulletStateMachine } from './BulletStateMachine';
import { EntityStateEnum, EntityTypeEnum, InputTypeEnum, EventEnum } from '../../game/common/Enum';
import { IActor, IBullet } from '../../game/common/Interface';
import { WeaponManager } from '../weapon/WeaponManager';
import EventManager from '../../core/utils/EventManager';
import { ExplosionManager } from '../explosion/ExplosionManager';
import { ObjectPoolManager } from '../../core/utils/ObjectPoolManager';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends EntityManager {
  type: EntityTypeEnum
  id: number

  protected onLoad(): void {
  }

  init(data: IBullet) {
    this.id = data.id
    this.type = data.type
    // 这里不是很懂，做子弹状态机（目的：让子弹播放对应的动画）
    this.fsm = this.addComponent(BulletStateMachine)
    this.fsm.init(data.type)
    this.state = EntityStateEnum.Idle
    this.node.active = false // 初始不可见,防止放在舞台上的子弹预制体一开始就显示出来

    EventManager.instance.on(EventEnum.ExplosionBorn, this.handleExplosionBorn, this)
  }

  handleExplosionBorn(id: number, { x, y }: Vec2) {
    if (id !== this.id) return

    // let prefab = DataManager.instance.prefabMap.get(EntityTypeEnum.Explosion)
    // let explosion = instantiate(prefab)
    // explosion.setParent(DataManager.instance.stage)
    // 使用对象池管理，不用自己实例化
    let explosion = ObjectPoolManager.instance.get(EntityTypeEnum.Explosion)

    // 添加状态机
    let em = explosion.getComponent(ExplosionManager) || explosion.addComponent(ExplosionManager)
    em.init(EntityTypeEnum.Explosion, { x, y })

    // 解绑事件
    EventManager.instance.off(EventEnum.ExplosionBorn, this.handleExplosionBorn, this)
    DataManager.instance.bulletMap.delete(this.id)
    // this.node.destroy()
    // 使用对象池管理
    ObjectPoolManager.instance.ret(this.node)
  }

  render(data: IBullet) {
    this.node.active = true // 渲染后才出现子弹
    const { direction, position } = data
    this.node.setPosition(position.x, position.y)

    // this.node.setScale(direction.x > 0 ? 1 : -1, 1)

    // 不能直接用正切，否则翻转反方向的时候，计算会错误
    // const rad = Math.atan(direction.y / direction.x)
    const side = Math.sqrt(direction.x ** 2 + direction.y ** 2)
    const rad = Math.asin(direction.y / side)
    let angle = (rad / Math.PI) * 180
    angle = direction.x > 0 ? angle : -angle + 180
    this.node.setRotationFromEuler(0, 0, angle)
  }

  start() {

  }
}


