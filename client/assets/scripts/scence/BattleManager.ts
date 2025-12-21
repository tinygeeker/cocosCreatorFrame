import { _decorator, Component, Input, input, instantiate, Node, Prefab, SpriteFrame } from 'cc';
import DataManager from '../global/DataManager';
import { JoyStickManager } from '../game/JoyStickManager';
import { ResourceManager } from '../global/ResoureManager';
import { ActorManager } from '../entity/actor/ActorManager';
import { PrefabPathEnum, texturePathEnum } from '../Enum';
import { EntityTypeEnum } from '../common';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    private stage: Node
    private ui: Node
    private _shouldUpdate: boolean = false

    protected onLoad(): void {
        this.stage = this.node.getChildByName('GameLayout')
        this.ui = this.node.getChildByName('GameControl')
        this.stage.destroyAllChildren()
        DataManager.instance.jm = this.ui.getComponentInChildren(JoyStickManager)
    }

    protected onDestroy(): void {
    }


    onTouchEnd() {

    }

    async start() {
        await this.loadRes()
        this.initMap()
        this._shouldUpdate = true
    }

    async loadRes() {
        const list = []
        for (const type in PrefabPathEnum) {
            const p = ResourceManager.instance.loadRes(PrefabPathEnum[type], Prefab).then((prefab) => {
                DataManager.instance.prefabMap.set(type, prefab)
            })
            list.push(p)
        }

        for (const type in texturePathEnum) {
            const p = ResourceManager.instance.loadDir(texturePathEnum[type], SpriteFrame).then((spriteFrames) => {
                DataManager.instance.textureMap.set(type, spriteFrames)
            })
            list.push(p)
        }

        await Promise.all(list)
    }

    initMap() {
        let prefab = DataManager.instance.prefabMap.get(EntityTypeEnum.Map)
        let map = instantiate(prefab)
        map.setParent(this.stage)
    }

    update(deltaTime: number) {
        if (!this._shouldUpdate) return
        this.render()
        this.tick(deltaTime)
    }

    tick(dt) {
        this.tickActor(dt)
    }

    tickActor(dt) {
        for (const data of DataManager.instance.state.actors) {
            const { id } = data
            let actorManager = DataManager.instance.actorMap.get(id)
            actorManager.tick(dt)
        }
    }

    render() {
        this.renderActor()
    }

    renderActor() {
        for (const data of DataManager.instance.state.actors) {
            let { id, type } = data
            let actorManager = DataManager.instance.actorMap.get(id)
            if (!actorManager) {
                // let prefab = await ResourceManager.instance.loadRes('prefabs/Actor', Prefab) // 防止未加载一直执行
                let prefab = DataManager.instance.prefabMap.get(type)
                let actor = instantiate(prefab)
                actor.setParent(this.stage)
                actorManager = actor.addComponent(ActorManager)
                DataManager.instance.actorMap.set(data.id, actorManager)
                actorManager.init(data)
            } else {
                actorManager.render(data)
            }
        }
    }
}


