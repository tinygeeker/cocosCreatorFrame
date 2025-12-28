export enum FsmParamTypeEnum {
  Number = "Number",
  Trigger = "Trigger",
}

export enum ParamsNameEnum {
  Idle = "Idle",
  Run = "Run",
  Attack = "Attack",
}

export enum EventEnum {
  WeaponShoot = 'WeaponShoot',
  ExplosionBorn = 'ExplosionBorn',
  BulletBorn = 'BulletBorn',
  ClientSync = 'ClientSync',
  ServerSync = 'ServerSync',
}


export enum PrefabPathEnum {
  Map = 'prefabs/Map',
  Actor1 = 'prefabs/Actor',
  Weapon1 = 'prefabs/Weapon1',
  Bullet2 = 'prefabs/Bullet2',
  Explosion = 'prefabs/Explosion',
}

export enum texturePathEnum {
  Actor1Idle = 'textures/actor/actor1/idle',
  Actor1Run = 'textures/actor/actor1/run',
  Weapon1Idle = 'textures/weapon/weapon1/idle',
  Weapon1Attack = 'textures/weapon/weapon1/attack',
  Bullet2Idle = 'textures/bullet/bullet2',
  ExplosionIdle = 'textures/explosion',
}

export enum EntityStateEnum {
  Idle = "Idle",
  Run = "Run",
  Attack = "Attack",
}

export enum ApiMsgEnum {
  MsgClientSync = "MsgClientSync",
  MsgServerSync = "MsgServerSync",
  ApiPlayerJoin = "ApiPlayerJoin"
}