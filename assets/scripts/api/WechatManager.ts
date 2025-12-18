import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { wechatConfig } from "../config/Index";
import { IPlatform } from '../interfaces/IPlatform'

@ccclass('WechatManager')
export class WechatManager implements IPlatform {
  private _rewardedVideoAd = null
  private _rewardedCallback: Function = null

  init() {
    this.initShare()
    this.createBannerAd()
    this.createRewardedVideoAd()
    this.createInterstitialAd()
  }

  initShare() {
    if (wechatConfig.showShareMenu) {
      wx.showShareMenu({
        menus: wechatConfig.showShareMenu
      })
    }
  }

  onShareAppMessage(title) {
    if (wechatConfig.showShareMenu.indexOf('shareAppMessage') == -1) {
      console.error('未开启转发功能');
      return
    }
    wx.onShareAppMessage(function () {
      return {
        title: title
      }
    })
  }

  onShareTimeline(title) {
    if (wechatConfig.showShareMenu.indexOf('shareTimeline') == -1) {
      console.error('未开启分享朋友圈功能');
      return
    }
    wx.onShareTimeline(function () {
      return {
        title: title
      }
    })
  }

  login(callback) {
    wx.login({
      success(res) {
        if (res.code) {
          callback(res)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  getUserinfo(callback) {
    let _this = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] === true) {
          wx.getUserInfo({
            success: (res) => {
              callback(res)
            },
          });
        } else {
          _this.createUserInfoButton(callback)
        }
      },
    });
  }

  createUserInfoButton(successCallback) {
    const button = wx.createUserInfoButton({
      type: 'text',
      text: '获取用户信息',
      style: {
        left: 10,
        top: 76,
        width: 200,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    })
    button.onTap((res) => {
      successCallback(res)
    })
  }

  createBannerAd() {

  }

  showBannerAd() { }

  hideBannerAd() { }

  createRewardedVideoAd() {
    this._rewardedVideoAd = wx.createRewardedVideoAd({
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

  writePhotosAlbum() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum()
            }
          })
        }
      }
    })
  }

  createFeedbackButton() {
    let button = wx.createFeedbackButton({
      type: 'text',
      text: '打开意见反馈页面',
      style: {
        left: 10,
        top: 76,
        width: 200,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    })
  }

  vibrateShort(type, callback) {
    wx.vibrateShort({
      type: type,
      success: () => {
        callback()
      },
      fail: (res) => {
        console.error('短振动失败：', res)
      },
      complete: (res) => {
        console.log('短振动完成：', res)
      },
    })
  }

  vibrateLong(callback) {
    wx.vibrateLong({
      success: (res) => {
        callback(res)
      },
      fail: (res) => {
        console.error('长振动失败：', res)
      },
      complete: (res) => {
        console.log('长振动完成：', res)
      },
    })
  }

  scanCode(callback) {
    wx.scanCode({
      onlyFromCamera: wechatConfig.onlyFromCamera,
      success(res) {
        callback(res)
      }
    })
  }
}


