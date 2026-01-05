import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RoomManager')
export class RoomManager extends Component {
  init(room) {
    const label = this.node.getComponent(Label)
    label.string = room.name
    this.node.active = true
  }

  start() {

  }

  update(deltaTime: number) {

  }
}


