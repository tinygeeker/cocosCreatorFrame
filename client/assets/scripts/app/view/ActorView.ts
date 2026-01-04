import { _decorator, Component, Node } from 'cc'
import { ActorModel } from '../model/ActorModel'

const { ccclass } = _decorator

@ccclass('ActorView')
export class ActorView extends Component {
  actorId: number

  render(model: ActorModel) {
    this.node.setPosition(model.position.x, model.position.y)

    if (model.direction.x !== 0) {
      this.node.setScale(model.direction.x > 0 ? 1 : -1, 1)
    }
  }
}
