export enum SceneEnum {
  Login = 'Login',
  Battle = 'Battle',
  Hall = 'Hall',
  Room = 'Room',
}

export enum FsmParamTypeEnum {
  Number = "Number",
  Trigger = "Trigger",
}

export enum ParamsNameEnum {
  Idle = "Idle",
  Run = "Run",
  Attack = "Attack",
}

export enum InputTypeEnum {
  ActorMove = 'actor.move',
  WeaponShoot = 'weapon.shoot',
  TimePast = 'time.past'
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
  Actor1Idle = 'textures/actor/actor1/idle',
  Actor1Run = 'textures/actor/actor1/run',
  Weapon1Idle = 'textures/weapon/weapon1/idle',
  Weapon1Attack = 'textures/weapon/weapon1/attack',
  Bullet2Idle = 'textures/bullet/bullet2',
  ExplosionIdle = 'textures/explosion',
}

export enum PrefabPathEnum {
  Map = 'prefabs/Map',
  Actor1 = 'prefabs/Actor',
  Weapon1 = 'prefabs/Weapon1',
  Bullet2 = 'prefabs/Bullet2',
  Explosion = 'prefabs/Explosion',
}

export enum IClientInput {

}

export enum SocketApiEnum {
  UserLogin = 'user.login',
  UserList = 'user.list',
  UserAdd = 'user.add',
  UserLeave = 'user.leave',
  RoomCreate = 'room.create',
  RoomList = 'room.list',
  HallChat = 'hall.chat',
  RoomJoin = 'room.join',
  FrameSync = 'frame.sync',
  FrameInput = 'frame.input',
}

export enum EventEnum {
  WeaponShoot = 'WeaponShoot',
  ExplosionBorn = 'ExplosionBorn',
  BulletBorn = 'BulletBorn',
  ClientInput = 'clientInput'
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