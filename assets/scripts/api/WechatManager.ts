import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { wechatConfig } from "../config/Index";
import { IPlatform } from '../interfaces/IPlatform'

@ccclass('WechatManager')
export class WechatManager implements IPlatform {
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
    this._rewardedVideoAd = wx.createRewardedVideodAd({
      adUnitId: wechatConfig.rewardedVideoID
    })
  }

  showRewardedVideoAd() {
    this._rewardedVideoAd.onLoad((res) => {
      console.log('激励广告onLoad：', res)
    })

    this._rewardedVideoAd.show(() => {
      console.error('激励视频广告显示成功！')
    }).catch(err => {
      console.error('激励广告show失败：', err)
      console.log('重新拉取广告~')
      this._rewardedVideoAd.load()
        .then(() => this._rewardedVideoAd.show())
    })

    this._rewardedVideoAd.onError(err => {
      console.error('激励广告onError：', err)
    })
  }

  showRewardedVideoAd(callback) {
    this._rewardedVideoAd.onClose((res) => {
      callback(res)
    })
  }

  createInterstitialAd() { }

  showInterstitial() { }

  hideInterstitial() { }
}


