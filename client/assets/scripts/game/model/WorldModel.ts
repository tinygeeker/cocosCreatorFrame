import { ActorModel } from './ActorModel'

export class WorldModel {
  actors: Map<number, ActorModel> = new Map()
  frameId = 0

  getActor(id: number) {
    return this.actors.get(id)
  }
}
