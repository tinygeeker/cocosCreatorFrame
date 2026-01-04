import { WorldModel } from '../model/WorldModel'
import { FrameInput } from './FrameInput'

export class MoveSystem {
  static apply(world: WorldModel, input: FrameInput) {
    const actor = world.getActor(input.playerId)
    if (!actor) return

    actor.direction = input.direction
    actor.position.x += input.direction.x * actor.speed * input.deltaTime
    actor.position.y += input.direction.y * actor.speed * input.deltaTime
  }
}
