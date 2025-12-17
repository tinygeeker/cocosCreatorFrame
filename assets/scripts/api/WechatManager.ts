import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { wechatConfig } from "../config/Index";
import { IPlatform } from '../interfaces/IPlatform'

@ccclass('WechatManager')
export class WechatManager implements IPlatform {
  private _rewardedVideoAd = null
  private _rewardedCallback: Function = null

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

  /**
   * 激励广告初始化
   */
  createRewardedVideodAd() {
    this._rewardedVideoAd = wx.createRewardedVideodAd({
      adUnitId: wechatConfig.rewardedVideoID
    })

    this._rewardedVideoAd.onLoad(() => {
      console.log('加载激励广告！')
    })

    this._rewardedVideoAd.onError((err) => {
      console.error('激励广告错误：', err)
    })

    this._rewardedVideoAd.onClose((res) => {
      console.log('激励广告关闭：', res.isEnded)
      if (this._rewardedCallback) this._rewardedCallback(res)
    })
  }

  /**
   * 播放激励广告
   * @param callback 
   */
  showRewardedVideoAd(callback) {
    this._rewardedCallback = callback
    this._rewardedVideoAd.show(() => {
      console.error('激励广告显示！')
    }).catch(err => {
      console.error('激励广告错误：', err)
      this._rewardedVideoAd.load()
        .then(() => this._rewardedVideoAd.show())
    })
  }

  hideRewardedVideoAd() { }

  createInterstitialAd() { }

  showInterstitial() { }

  hideInterstitial() { }
}


