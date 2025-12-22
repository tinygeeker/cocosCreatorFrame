import { _decorator, Component, director, instantiate, Node, UITransform, Vec2, Vec3 } from 'cc';
import DataManager from '../../global/DataManager';
import { EntityTypeEnum, IActor, InputTypeEnum } from '../../common';
import { EntityManager } from '../../base/EntityManager';
import { WeaponStateMachine } from './WeaponStateMachine';
import { EntityStateEnum, EventEnum } from '../../Enum';
import EventManager from '../../global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('WeaponManager')
export class WeaponManager extends EntityManager {
  private owner: number;
  private body: Node;
  private anchor: Node;
  private point: Node;

  protected onLoad(): void {
  }

  init(data: IActor) {
    this.owner = data.id
    this.body = this.node.getChildByName('Body')
    this.anchor = this.body.getChildByName('Anchor')
    this.point = this.anchor.getChildByName('Point')

    // 这里不是很懂，做武器状态机（目的：让武器播放对应的动画）
    this.fsm = this.body.addComponent(WeaponStateMachine)
    this.fsm.init(data.weaponType)
    this.state = EntityStateEnum.Idle

    EventManager.instance.on(EventEnum.WeaponShoot, this.weaponShoot, this) // 监听武器射击
  }

  protected onDestroy(): void {
    EventManager.instance.off(EventEnum.WeaponShoot, this.weaponShoot, this)// 解绑监听武器射击
  }


  weaponShoot() {
    const pointWorldPos = this.point.getWorldPosition()
    const pointStagePos = DataManager.instance.stage.getComponent(UITransform).convertToNodeSpaceAR(pointWorldPos)
    const anchorWorldPos = this.anchor.getWorldPosition()
    const direction = new Vec2(pointWorldPos.x - anchorWorldPos.x, pointWorldPos.y - anchorWorldPos.y).normalize()

    DataManager.instance.applyInput({
      type: InputTypeEnum.WeaponShoot,
      owner: 1,
      position: { x: pointStagePos.x, y: pointStagePos.y },
      direction: { x: direction.x, y: direction.y },
    })

    console.log('[bullets]：', DataManager.instance.state.bullets)
  }
}


