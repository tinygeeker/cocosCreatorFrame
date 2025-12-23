import { _decorator, Animation, AnimationClip } from "cc";
import State from "../../base/State";
import StateMachine, { getInitParamsTrigger } from "../../base/StateMachine";
import { EntityTypeEnum } from "../../common";
import { EntityStateEnum, ParamsNameEnum } from "../../Enum";
const { ccclass } = _decorator;

@ccclass("ExplosionStateMachine")
export class ExplosionStateMachine extends StateMachine {
  init(type: EntityTypeEnum) {
    this.type = type;
    this.animationComponent = this.node.addComponent(Animation);
    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  initParams() {
    this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger());
  }

  initStateMachines() {
    // 动画只播放一次，修改loop属性为Normal
    this.stateMachines.set(ParamsNameEnum.Idle, new State(this, `${this.type}${EntityStateEnum.Idle}`, AnimationClip.WrapMode.Normal));
  }

  initAnimationEvent() {
    // 动画播放完毕就销毁
    this.animationComponent.on(Animation.EventType.FINISHED, () => {
      this.node.destroy()
    })
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(ParamsNameEnum.Idle):
        if (this.params.get(ParamsNameEnum.Idle).value) {
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
