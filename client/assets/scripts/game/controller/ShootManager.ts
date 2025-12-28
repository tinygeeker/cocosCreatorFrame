import { _decorator, Component, Node } from 'cc';
import EventManager from '../../core/utils/EventManager';
import { EventEnum } from '../common/Enum';
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


