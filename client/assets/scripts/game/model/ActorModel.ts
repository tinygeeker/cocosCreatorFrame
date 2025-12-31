export interface IVec2 {
  x: number
  y: number
}

export interface ActorModel {
  id: number
  position: IVec2
  direction: IVec2
  speed: number
}
