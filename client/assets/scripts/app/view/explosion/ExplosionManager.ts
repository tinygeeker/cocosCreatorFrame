import { _decorator, Component, director, instantiate, IVec2, Node, Vec2 } from 'cc';
import { IActor, IBullet } from '../../common/Type';
import { EntityManager } from '../../../core/base/EntityManager';
import { ExplosionStateMachine } from './ExplosionStateMachine';
import { EntityStateEnum, EventEnum, EntityTypeEnum, InputTypeEnum } from '../../common/Enum';
import DataManager from '../../../core/base/DataManager';
import EventManager from '../../../core/base/EventManager';
const { ccclass, property } = _decorator;

@ccclass('ExplosionManager')
export class ExplosionManager extends EntityManager {
  type: EntityTypeEnum
  id: number

  protected onLoad(): void {
  }

  init(type: EntityTypeEnum, { x, y }: IVec2) {
    this.node.setPosition(x, y)
    this.type = type
    // 这里不是很懂，做子弹销毁时状态机（目的：播放对应的爆炸动画）
    this.fsm = this.addComponent(ExplosionStateMachine)
    this.fsm.init(type)
    this.state = EntityStateEnum.Idle
  }
}


