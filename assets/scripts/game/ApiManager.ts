import { _decorator, Component, Node, sys } from 'cc';
import { CommonUIManager } from '../CommonUIManager';
import { WechatManager } from '../api/WechatManager';
import { DebugManager } from '../api/DebugManager';
const { ccclass, property } = _decorator;

@ccclass('ApiManager')
export class ApiManager extends Component {
  start() {
    switch (sys.platform) {
      case sys.Platform.WECHAT_GAME:
        window.platform = new WechatManager();
      default:
        window.platform = new DebugManager();
    }

    console.log('平台：', sys.platform)
    window.platform.init()
  }

  openApi() {
    this.node.active = true
  }

  quitApi() {
    this.node.active = false
  }

  shareToFriend() {
    console.log('分享给朋友~')

  }

  shareToLine() {
    console.log('分享朋友圈~')
  }

  startPlayBannerAd() {
    console.log('播放banner广告~')
  }

  startPlayInterAd() {
    console.log('播放激励广告~')
    window.platform.showRewardedVideoAd()
  }

  startPlayXAd() {
    console.log('播放插屏广告~')
  }

  rank() {
    console.log('打开排行榜~')
  }

  pay() {
    console.log('点击支付~')
  }

  vebrator() {
    console.log('手机物理功能-震动~')
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


