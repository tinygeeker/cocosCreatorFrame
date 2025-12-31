import { _decorator, Component, director, instantiate, IVec2, Node, Vec2 } from 'cc';
import DataManager from '../../core/utils/DataManager';
import { IActor, IBullet } from '../../game/common/Interface';
import { EntityManager } from '../../core/utils/EntityManager';
import { ExplosionStateMachine } from './ExplosionStateMachine';
import { EntityStateEnum, EventEnum, EntityTypeEnum, InputTypeEnum } from '../../game/common/Enum';
import EventManager from '../../core/utils/EventManager';
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


