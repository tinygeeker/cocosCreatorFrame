import EventManager from '../../core/base/EventManager'
import { InputTypeEnum, EventEnum } from '../common/Enum'

export class PlayerInputController {
  update(dt: number, joystickDir: { x: number; y: number }) {
    if (joystickDir.x === 0 && joystickDir.y === 0) return

    EventManager.instance.emit(EventEnum.ClientInput, {
      type: InputTypeEnum.ActorMove,
      direction: joystickDir,
      deltaTime: dt
    })
  }
}
