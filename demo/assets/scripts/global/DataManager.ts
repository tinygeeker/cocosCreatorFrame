import { Prefab, SpriteFrame, Node } from "cc";
import SingletonManager from "../base/SingletonManager";
import { EntityTypeEnum, IActorMove, IBullet, IClientInput, InputTypeEnum, IState } from "../common";
import { ActorManager } from "../entity/actor/ActorManager";
import { JoyStickManager } from "../game/JoyStickManager";
import { BulletManager } from "../entity/bullet/BulletManager";
import EventManager from "./EventManager";
import { EventEnum } from "../Enum";

const ACTOR_RADIUS = 50 // 人物半径
const BULLET_RADIUS = 10 // 子弹半径
const BULLET_DAMAGE = 5 // 子弹伤害

export default class DataManager extends SingletonManager {

  ACTOR_SPEED = 100 // 角色移动速度
  BULLET_SPEED = 600 // 子弹移动速度
  MAP_WIDTH = 1334 // 地图宽度
  MAP_HEIGHT = 750 // 地图高度

  static get instance() {
    return super.GetInstance<DataManager>()
  }

  myPlayerId = 1 // 当前玩家的Id,每次登录后会赋值

  stage: Node // 游戏场景节点
  jm: JoyStickManager // 摇杆管理器
  actorMap: Map<number, ActorManager> = new Map()
  bulletMap: Map<number, BulletManager> = new Map()
  prefabMap: Map<string, Prefab> = new Map()
  textureMap: Map<string, SpriteFrame[]> = new Map()

  // 游戏所有的数据状态
  state: IState = {
    actors: [
      {
        id: 1,
        type: EntityTypeEnum.Actor1,
        weaponType: EntityTypeEnum.Weapon1,
        bulletType: EntityTypeEnum.Bullet2,
        hp: 100,
        position: {
          x: -150,
          y: -150
        },
        direction: {
          x: 1, // 起手拿枪
          y: 0
        }
      },
      {
        id: 2,
        type: EntityTypeEnum.Actor1,
        weaponType: EntityTypeEnum.Weapon1,
        bulletType: EntityTypeEnum.Bullet2,
        hp: 100,
        position: {
          x: 150,
          y: 150
        },
        direction: {
          x: -1,
          y: 0
        }
      }
    ],
    bullets: [],
    nextBulletId: 1
  }

  // 每个对应的实体Manager中渲染实时用来修改上面的state的方法
  applyInput(input: IClientInput) {
    switch (input.type) {
      // 角色移动
      case InputTypeEnum.ActorMove: {
        const { id, deltaTime, direction: { x, y } } = input

        const actor = this.state.actors.find(e => e.id === id)
        actor.direction.x = x
        actor.direction.y = y

        actor.position.x += x * deltaTime * this.ACTOR_SPEED
        actor.position.y += y * deltaTime * this.ACTOR_SPEED
        break
      }
      // 武器状态
      case InputTypeEnum.WeaponShoot: {
        const { owner, position, direction } = input
        const bullet: IBullet = {
          id: this.state.nextBulletId++,
          owner,
          position,
          direction,
          type: this.actorMap.get(owner).bulletType
        }

        // 改变武器状态（射击时枪头冒火）
        EventManager.instance.emit(EventEnum.BulletBorn, owner)

        this.state.bullets.push(bullet)
        break
      }
      // 时间流逝
      case InputTypeEnum.TimePast: {
        const { dt } = input
        const { bullets, actors } = this.state

        // 超过屏幕删除子弹
        for (let i = bullets.length - 1; i >= 0; i--) {
          const bullet = bullets[i]

          // 检测是否打到敌人
          for (let j = actors.length - 1; j >= 0; j--) {
            const actor = actors[j]
            if ((actor.position.x - bullet.position.x) ** 2 + (actor.position.y - bullet.position.y) ** 2 < (ACTOR_RADIUS + BULLET_RADIUS) ** 2) {
              // 监听子弹爆炸事件
              actor.hp -= BULLET_DAMAGE

              EventManager.instance.emit(
                EventEnum.ExplosionBorn,
                bullet.id,
                { x: (actor.position.x + bullet.position.x) / 2, y: (actor.position.y + bullet.position.y) / 2 }
              )

              bullets.splice(i, 1)
              break
            }
          }

          if (Math.abs(bullet.position.x) > this.MAP_WIDTH / 2 || Math.abs(bullet.position.y) > this.MAP_HEIGHT / 2) {
            // 监听子弹爆炸事件
            EventManager.instance.emit(EventEnum.ExplosionBorn, bullet.id, { x: bullet.position.x, y: bullet.position.y })

            bullets.splice(i, 1)
            break
          }
        }

        // 更新子弹的位置
        for (const bullet of bullets) {
          bullet.position.x += bullet.direction.x * dt * this.BULLET_SPEED // 方向 * 时间 * 速度
          bullet.position.y += bullet.direction.y * dt * this.BULLET_SPEED
        }
      }
    }
  }
}