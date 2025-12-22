import { _decorator, Component, Node } from 'cc';
import EventManager from '../global/EventManager';
import { EventEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('ShootManager')
export class ShootManager extends Component {
  start() {

  }

  update(deltaTime: number) {

  }

  handleShoot() {
    EventManager.instance.emit(EventEnum.WeaponShoot)
  }
}


