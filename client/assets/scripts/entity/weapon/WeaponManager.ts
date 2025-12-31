import { _decorator, Component, director, instantiate, Node, UITransform, Vec2, Vec3 } from 'cc';
import DataManager from '../../core/utils/DataManager';
import { EntityManager } from '../../core/utils/EntityManager';
import { WeaponStateMachine } from './WeaponStateMachine';
import { IActor } from '../../game/common/Interface';
import { EntityStateEnum, EntityTypeEnum, InputTypeEnum, EventEnum } from '../../game/common/Enum';
import EventManager from '../../core/utils/EventManager';
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

    EventManager.instance.on(EventEnum.BulletBorn, this.handleBulletBorn, this) // 枪头冒火特效
    EventManager.instance.on(EventEnum.WeaponShoot, this.weaponShoot, this) // 监听武器射击
  }

  protected onDestroy(): void {
    EventManager.instance.off(EventEnum.BulletBorn, this.handleBulletBorn, this) // 解绑枪头冒火特效 
    EventManager.instance.off(EventEnum.WeaponShoot, this.weaponShoot, this) // 解绑监听武器射击
  }

  handleBulletBorn(owner: number) {
    if (owner != this.owner) return
    this.state = EntityStateEnum.Attack
  }


  weaponShoot() {
    if (this.owner !== DataManager.instance.myPlayerId) return // 只能操作自己射击

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


