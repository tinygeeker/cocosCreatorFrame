import { _decorator, Animation, AnimationClip } from "cc";
import State from "../../core/utils/State";
import StateMachine, { getInitParamsTrigger } from "../../core/utils/StateMachine";
import { EntityStateEnum, EntityTypeEnum, ParamsNameEnum } from "../../game/common/Enum";
import { ObjectPoolManager } from "../../core/utils/ObjectPoolManager";
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
      // this.node.destroy()
      // 使用对象池管理
      ObjectPoolManager.instance.ret(this.node)
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
