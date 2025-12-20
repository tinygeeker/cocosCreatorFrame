import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RankManager')
export class RankManager extends Component {
  start() {

  }

  openRank() {
    this.node.active = true;
  }

  quitRank() {
    this.node.active = false;
  }

  update(deltaTime: number) {

  }
}


