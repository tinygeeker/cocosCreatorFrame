import { _decorator, Component, EventTouch, Input, input, Node, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JoyStickManager')
export class JoyStickManager extends Component {

    input: Vec2 = Vec2.ZERO

    private _bodyNode: Node
    private _stickNode: Node
    private _bodyBeginPos: Vec2
    private _radius: number

    protected onLoad(): void {
        this._bodyNode = this.node.getChildByName('Body')
        this._stickNode = this._bodyNode.getChildByName('Stick')
        this._bodyBeginPos = new Vec2(this._bodyNode.x, this._bodyNode.y)
        this._radius = this._bodyNode.getComponent(UITransform).contentSize.x / 2

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this)
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    start() {

    }

    update(deltaTime: number) {

    }

    onTouchStart(event: EventTouch) {
        let pos = event.getUILocation()
        this._bodyNode.setPosition(pos.x, pos.y)
    }

    onTouchMove(event: EventTouch) {
        let pos = event.getUILocation()
        let stickPos = new Vec2(pos.x - this._bodyNode.x, pos.y - this._bodyNode.y)
        if (stickPos.length() > this._radius) {
            stickPos.multiplyScalar(this._radius / stickPos.length())
        }
        this._stickNode.setPosition(stickPos.x, stickPos.y)

        // 归一化
        this.input = stickPos.clone().normalize()
        // console.log(this.input)
    }

    onTouchEnd() {
        this._bodyNode.setPosition(this._bodyBeginPos.x, this._bodyBeginPos.y)
        this._stickNode.setPosition(0, 0)
        this.input = Vec2.ZERO
    }
}


