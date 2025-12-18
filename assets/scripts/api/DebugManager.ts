import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { wechatConfig } from "../config/Index";
import { IPlatform } from '../interfaces/IPlatform'

@ccclass('DebugManager')
export class DebugManager implements IPlatform {
  private _rewardedVideoAd = null
  private _rewardedCallback: Function = null

  init() {
    this.createBannerAd()
    this.createRewardedVideoAd()
    this.createInterstitialAd()
  }

  login() { }

  getUserinfo() { }

  createUserInfoButton(successCallback) { }

  createBannerAd() {

  }

  showBannerAd() { }

  hideBannerAd() { }

  createRewardedVideoAd() {

  }

  showRewardedVideoAd(callback) {
    callback({ isEnded: true })
  }

  hideRewardedVideoAd() { }

  createInterstitialAd() { }

  showInterstitial() { }

  hideInterstitial() { }
}


