import { WorldModel } from '../model/WorldModel'
import { ActorView } from './ActorView'

export class WorldView {
  actorViews: Map<number, ActorView> = new Map()

  render(world: WorldModel) {
    world.actors.forEach((actor, id) => {
      const view = this.actorViews.get(id)
      view?.render(actor)
    })
  }
}
