export enum FsmParamTypeEnum {
  Trigger,
  Number
}

export enum ParamsNameEnum {
  Idle = 'Idle',
  Run = 'Run',
  Attack = 'Attack',
}

export enum InputTypeEnum {
  ActorMove = 'ActorMove',
  WeaponShoot = 'WeaponShoot',
  TimePast = 'TimePast'
}

export enum EntityTypeEnum {
  Map = 'Map',
  Actor1 = 'Actor1',
  Weapon1 = 'Weapon1',
  Bullet1 = 'Bullet1',
  Bullet2 = 'Bullet2',
  Explosion = 'Explosion'
}

export enum EntityStateEnum {
  Idle = 'Idle',
  Run = 'Run',
  Attack = 'Attack',
}

export enum texturePathEnum {

}

export enum PrefabPathEnum {

}

export enum IClientInput {

}

export enum ApiMsgEnum {
  ApiPlayerJoin = 'ApiPlayerJoin',
  MsgClientSync = 'MsgClientSync',
  MsgServerSync = 'ApiPlayerJoin'
}

export enum EventEnum {
  WeaponShoot,
  BulletBorn,
  ExplosionBorn,
  ClientSync,
}

export enum GameStatus {
  NOSTART,
  SNATCHLABDLORD,
  START,
}

export enum PlayerReadyStatus {
  READY,
  UNREADY
}