export declare interface PlatformAdapter {
  login(): Promise<{ uid: string; token: string }>;
  getUserInfo(): Promise<any>;
  share?(data: any): void;
  pay?(data: any): void;
  createUserInfoButton?(successCallback)
  createBannerAd?()
  showBannerAd?()
  hideBannerAd?()
  createRewardedVideoAd?()
  showRewardedVideoAd?(callback)
  hideRewardedVideoAd?()
  createInterstitialAd?()
  showInterstitial?()
  hideInterstitial?()
}