export class GameLoop {
  constructor(
    private world: WorldModel,
    private view: WorldView
  ) {}

  tick() {
    this.view.render(this.world)
  }
}
