import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {
  init(player) {
    const label = this.node.getComponent(Label)
    label.string = player.nickname
    this.node.active = true
  }

  start() {

  }

  update(deltaTime: number) {

  }
}


