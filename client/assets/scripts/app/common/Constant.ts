// 甜美女生音频地址
const sweetGirlAudio = "RoomAudio/Girl/";
// 当前用户使用的音频包名，后期如果想做多个的话可以修改
export const audioPageageName = "sweetGirlAudio";
// 胜利音频
export const gameOverSuccessAudio = "RoomAudio/success";
// 失败音频
export const gameOverLoseAudio = "RoomAudio/lose";

export enum AudioType {
  duizi_1 = "duizi_1",
  duizi_2 = "duizi_2",
  duizi_3 = "duizi_3",
  duizi_4 = "duizi_4",
}

export const playAudios = {
  // 甜美女生音频（后期可以添加多种语音，key必须一致）
  "sweetGirlAudio": {
    [AudioType.duizi_1]: sweetGirlAudio + AudioType.duizi_1,
    [AudioType.duizi_2]: sweetGirlAudio + AudioType.duizi_2,
    [AudioType.duizi_3]: sweetGirlAudio + AudioType.duizi_3,
    [AudioType.duizi_4]: sweetGirlAudio + AudioType.duizi_4
  }
}


export const GameModel = {
  0: "创建模式",
  1: "匹配模式",
  3: "人机模式", // 后续看看能不能添加
}