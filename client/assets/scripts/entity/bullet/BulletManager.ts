import { _decorator, Component, director, instantiate, Node } from 'cc';
import DataManager from '../../global/DataManager';
import { EntityTypeEnum, IActor, IBullet, InputTypeEnum } from '../../common';
import { EntityManager } from '../../base/EntityManager';
import { BulletStateMachine } from './BulletStateMachine';
import { EntityStateEnum } from '../../Enum';
import { WeaponManager } from '../weapon/WeaponManager';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends EntityManager {
  type: EntityTypeEnum

  protected onLoad(): void {
  }

  init(data: IBullet) {
    this.type = data.type
    // 这里不是很懂，做子弹状态机（目的：让子弹播放对应的动画）
    this.fsm = this.addComponent(BulletStateMachine)
    this.fsm.init(data.type)
    this.state = EntityStateEnum.Idle
    this.node.active = false // 初始不可见,防止放在舞台上的子弹预制体一开始就显示出来
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


