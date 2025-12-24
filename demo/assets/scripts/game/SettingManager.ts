import { _decorator, Component, Node } from 'cc';
import { CommonUIManager } from '../CommonUIManager';
const { ccclass, property } = _decorator;

@ccclass('SettingManager')
export class SettingManager extends Component {
  start() {

  }

  openSetting() {
    this.node.active = true;
  }

  quitSetting() {
    this.node.active = false;
  }

  changeBgAudio() {
    CommonUIManager.inst.showToast("修改成功");
  }

  changeGameAudio() {
    CommonUIManager.inst.showToast("修改失败");
  }

  update(deltaTime: number) {

  }
}


