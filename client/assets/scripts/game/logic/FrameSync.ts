import { WorldModel } from '../model/WorldModel'
import { MoveSystem } from './MoveSystem'

export class FrameSync {
  constructor(private world: WorldModel) {}

  onServerFrame(frameData: any) {
    this.world.frameId = frameData.frameId

    for (const input of frameData.inputs) {
      MoveSystem.apply(this.world, input)
    }
  }
}
