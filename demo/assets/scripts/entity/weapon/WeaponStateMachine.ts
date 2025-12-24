import { _decorator, Animation, AnimationClip } from "cc";
import State from "../../base/State";
import StateMachine, { getInitParamsTrigger } from "../../base/StateMachine";
import { EntityTypeEnum } from "../../common";
import { EntityStateEnum, ParamsNameEnum } from "../../Enum";
import { WeaponManager } from "./WeaponManager";
const { ccclass } = _decorator;

@ccclass("WeaponStateMachine")
export class WeaponStateMachine extends StateMachine {
  init(type: EntityTypeEnum) {
    this.type = type;
    this.animationComponent = this.node.addComponent(Animation);
    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  initParams() {
    this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger());
    this.params.set(ParamsNameEnum.Attack, getInitParamsTrigger());
  }

  initStateMachines() {
    // 设为true，每次动画从头播放
    this.stateMachines.set(ParamsNameEnum.Idle, new State(this, `${this.type}${EntityStateEnum.Idle}`, AnimationClip.WrapMode.Loop, true));
    this.stateMachines.set(ParamsNameEnum.Attack, new State(this, `${this.type}${EntityStateEnum.Attack}`, AnimationClip.WrapMode.Normal, true));
  }

  // 每次监听播放完成后，让其初始为不攻击状态
  initAnimationEvent() {
    this.animationComponent.on(Animation.EventType.FINISHED, () => {
      if (this.animationComponent.defaultClip.name.includes(EntityStateEnum.Attack)) {
        this.node.parent.getComponent(WeaponManager).state = EntityStateEnum.Idle
      }
    })
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(ParamsNameEnum.Idle):
      case this.stateMachines.get(ParamsNameEnum.Attack):
        if (this.params.get(ParamsNameEnum.Attack).value) {
          this.currentState = this.stateMachines.get(ParamsNameEnum.Attack);
        } else if (this.params.get(ParamsNameEnum.Idle).value) {
          this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
        } else {
          this.currentState = this.currentState;
        }
        break;
      default:
        this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
        break;
    }
  }
}
