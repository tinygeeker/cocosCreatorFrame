import { _decorator, Component, Node } from 'cc';
import { EventEnum } from '../../common/Enum';
import EventManager from '../../../core/base/EventManager';
const { ccclass, property } = _decorator;

@ccclass('ShootView')
export class ShootView extends Component {
  start() {

  }

  update(deltaTime: number) {

  }

  handleShoot() {
    EventManager.instance.emit(EventEnum.WeaponShoot)
  }
}


