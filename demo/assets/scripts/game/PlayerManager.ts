import { _decorator, Animation, Component, Input, input, instantiate, Node, Prefab, Sprite, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {
  @property({
    type: Prefab,
    displayName: '文字预制体'
  })
  labelPrefab: Prefab = null;

  private _scale: Vec3 = new Vec3(1, 1, 1);

  protected onLoad(): void {
  }

  protected onDestroy(): void {
  }

  startKnock() {
    tween(this.node.getChildByName('wooden_fish'))
      .to(0.1, { scale: new Vec3(1.2, 1.2, 1.2) }, {
        easing: 'backOut',
        onUpdate: (target, ratio) => {
          // 动画更新时的回调
        }
      })
      .to(0.1, { scale: this._scale }, {
        easing: 'elasticOut',
        onComplete: () => {
          console.log('Tween动画完成')
        }
      })
      .start();

    const labelNode = instantiate(this.labelPrefab);
    labelNode.setParent(this.node.getParent().getChildByName('GameDisplay'));

    const anim = labelNode.getComponent(Animation);

    // 播放动画
    this.scheduleOnce(() => {
      anim.play('Labelanimation');

      anim.once(Animation.EventType.FINISHED, () => {
        console.log('动画播放完毕！');

        this.scheduleOnce(() => {
          labelNode.destroy();
        }, 0);
      }, this);
    }, 0);
  }

  start() {

  }

  update(deltaTime: number) {

  }
}


