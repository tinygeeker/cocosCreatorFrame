import { _decorator, Component, director, instantiate, Node } from 'cc';
import DataManager from '../../global/DataManager';
import { EntityTypeEnum, IActor, InputTypeEnum } from '../../common';
import { EntityManager } from '../../base/EntityManager';
import { WeaponStateMachine } from './WeaponStateMachine';
import { EntityStateEnum } from '../../Enum';
const { ccclass, property } = _decorator;

@ccclass('WeaponManager')
export class WeaponManager extends EntityManager {
    private body: Node;
    private anchor: Node;
    private point: Node;

    protected onLoad(): void {
    }

    init(data: IActor) {
        this.body = this.node.getChildByName('Body')
        this.anchor = this.body.getChildByName('Anchor')
        this.point = this.anchor.getChildByName('Point')

        // 这里不是很懂，做武器状态机（目的：让武器播放对应的动画）
        this.fsm = this.body.addComponent(WeaponStateMachine)
        this.fsm.init(data.weaponType)
        this.state = EntityStateEnum.Idle
    }
}


