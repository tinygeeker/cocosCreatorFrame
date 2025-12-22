import { Prefab, SpriteFrame, Node } from "cc";
import SingletonManager from "../base/SingletonManager";
import { EntityTypeEnum, IActorMove, IBullet, IClientInput, InputTypeEnum, IState } from "../common";
import { ActorManager } from "../entity/actor/ActorManager";
import { JoyStickManager } from "../game/JoyStickManager";

export default class DataManager extends SingletonManager {

  ACTOR_SPEED = 100

  static get instance() {
    return super.GetInstance<DataManager>()
  }

  stage: Node
  jm: JoyStickManager
  actorMap: Map<number, ActorManager> = new Map()
  prefabMap: Map<string, Prefab> = new Map()
  textureMap: Map<string, SpriteFrame[]> = new Map()

  state: IState = {
    actors: [
      {
        id: 1,
        type: EntityTypeEnum.Actor1,
        weaponType: EntityTypeEnum.Weapon1,
        bulletType: EntityTypeEnum.Bullet1,
        position: {
          x: 0,
          y: 0
        },
        direction: {
          x: 0,
          y: 0
        }
      }
    ],
    bullets: [],
    nextBulletId: 1
  }

  applyInput(input: IClientInput) {
    switch (input.type) {
      case InputTypeEnum.ActorMove: {
        const { id, deltaTime, direction: { x, y } } = input

        const actor = this.state.actors.find(e => e.id === id)
        actor.direction.x = x
        actor.direction.y = y

        actor.position.x += x * deltaTime * this.ACTOR_SPEED
        actor.position.y += y * deltaTime * this.ACTOR_SPEED
        break
      }
      case InputTypeEnum.WeaponShoot: {
        const { owner, position, direction } = input
        const bullet: IBullet = {
          id: this.state.nextBulletId++,
          owner,
          position,
          direction,
          type: this.actorMap.get(owner).bulletType
        }

        this.state.bullets.push(bullet)
      }
    }
  }
}