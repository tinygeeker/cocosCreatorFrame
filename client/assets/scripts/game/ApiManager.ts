import { _decorator, Component, Node, sys } from 'cc';
import { CommonUIManager } from '../CommonUIManager';
import { post, get } from '../api/HttpManager';
import { WechatManager } from '../api/WechatManager';
import { DebugManager } from '../api/DebugManager';
const { ccclass, property } = _decorator;

@ccclass('ApiManager')
export class ApiManager extends Component {
  start() {
    switch (sys.platform) {
      case sys.Platform.WECHAT_GAME:
        window.platform = new WechatManager();
        break;
      default:
        window.platform = new DebugManager();
    }

    console.log('初始化平台：', sys.platform)
    window.platform.init()
  }

  requestPost() {
    let resp = post('/post', {
      username: 'tinygeeker'
    })

    console.log(resp)
  }

  requestGet() {
    let resp = get('/get', {
      username: 'tinygeeker'
    })

    console.log(resp)
  }

  login() {
    window.platform.login((res) => {
      console.log('登录成功：', res);
    });
  }

  openApi() {
    this.node.active = true;
  }

  quitApi() {
    this.node.active = false;
  }

  shareAppMessage() {
    window.platform.onShareAppMessage('亮仔转发测试');
  }

  shareTimeline() {
    window.platform.onShareTimeline('亮仔分享到朋友圈测试');
  }

  playBannerAd() {
    console.log('播放banner广告~');
  }

  playRewardedVideoAd() {
    window.platform.showRewardedVideoAd((res) => {
      if (res && res.isEnded) {
        console.log('发放奖励！', res);
      } else {
        console.log('无奖励！');
      }
    })
  }

  playInterstitialAd() {
    console.log('播放插屏广告~');
  }

  rank() {
    console.log('打开排行榜~');
  }

  getUserInfo() {
    window.platform.getUserinfo((res) => {
      console.log('获取用户信息：', res)
    })
  }

  pay() {
    window.platform.getUserinfo((res) => {
      console.log('获取用户信息：', res)
    })
  }

  vibrateShort() {
    window.platform.vibrateShort('heavy', () => {
      console.log('短振动完成！')
    })
  }

  vibrateLong() {
    window.platform.vibrateLong(() => {
      console.log('长振动完成！')
    })
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


