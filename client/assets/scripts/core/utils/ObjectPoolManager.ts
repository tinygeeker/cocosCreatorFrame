import { _decorator, resources, Asset, Node, instantiate } from "cc";
import SingletonManager from "../base/SingletonManager";
import DataManager from "./DataManager";
import { EntityTypeEnum } from "../../game/common/Enum";

export class ObjectPoolManager extends SingletonManager {
    private objectPool: Node
    private map: Map<EntityTypeEnum, Node[]> = new Map()

    static get instance() {
        return super.GetInstance<ObjectPoolManager>();
    }

    get(type: EntityTypeEnum) {
        if (!this.objectPool) {
            this.objectPool = new Node('ObjectPool')
            this.objectPool.setParent(DataManager.instance.stage)
        }

        if (!this.map.has(type)) {
            this.map.set(type, [])
            const container = new Node(`${type}Pool`)
            container.setParent(this.objectPool)
        }

        const nodes = this.map.get(type)
        if (!nodes.length) {
            const prefab = DataManager.instance.prefabMap.get(type)
            const node = instantiate(prefab)
            node.name = type
            node.setParent(this.objectPool.getChildByName(`${type}Pool`))
            node.active = true
            return node
        } else {
            const node = nodes.pop()
            node.active = true
            return node
        }
    }

    ret(node: Node) {
        node.active = false
        this.map.get(node.name as EntityTypeEnum).push(node)
    }
}
