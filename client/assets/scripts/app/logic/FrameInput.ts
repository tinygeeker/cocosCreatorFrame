import { InputTypeEnum } from '../common/Enum'

export interface FrameInput {
  frameId: number
  playerId: number
  type: InputTypeEnum
  direction: { x: number; y: number }
  deltaTime: number
}
