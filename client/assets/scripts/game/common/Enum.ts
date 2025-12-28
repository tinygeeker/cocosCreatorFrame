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

export enum GameStatus {
	NOSTART,
	SNATCHLABDLORD,
	START,
}

export enum PlayerReadyStatus {
	READY,
	UNREADY
}