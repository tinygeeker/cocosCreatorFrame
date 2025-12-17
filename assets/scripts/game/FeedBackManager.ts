import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FeedBackManager')
export class FeedBackManager extends Component {
  start() {

  }

  openFeedBack() {
    this.node.active = true;
  }

  quitFeedBack() {
    this.node.active = false;
  }

  update(deltaTime: number) {

  }
}


