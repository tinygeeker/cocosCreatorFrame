import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { wechatConfig } from "../config/Index";
import { IPlatform } from '../interfaces/IPlatform'

@ccclass('DebugManager')
export class DebugManager implements IPlatform {
  private _rewardedVideoAd = null

  init() {
    this.createBannerAd()
    this.createRewardedVideodAd()
    this.createInterstitialAd()
  }

  login() { }

  getUserinfo() { }

  createUserInfoButton(successCallback, errorCallback, target) { }

  createBannerAd() {

  }

  showBannerAd() { }

  hideBannerAd() { }

  createRewardedVideodAd() {
    if (this._rewardedVideoAd) {
      return this._rewardedVideoAd
    } else {
      this._rewardedVideoAd = wx.createRewardedVideodAd({
        adUnitId: wechatConfig.rewardedVideoID
      })

      this._rewardedVideoAd.onLoad((res) => {
        console.log('rewardedVideodAd广告加载：', res)
      })

      this._rewardedVideoAd.onError(err => {
        console.error('rewardedVideodAd广告失败：', err)
      })

      this._rewardedVideoAd.onClose((res) => {
        console.log('rewardedVideodAd广告关闭：', res)
      })
    }
  }

  showRewardedVideoAd() {
    console.log('成功播放了视频~')
  }

  hideRewardedVideoAd() { }

  createInterstitialAd() { }

  showInterstitial() { }

  hideInterstitial() { }
}


