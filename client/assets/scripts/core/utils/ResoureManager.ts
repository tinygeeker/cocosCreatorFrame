import { _decorator, resources, Asset } from "cc";
import SingletonManager from "../base/SingletonManager";

export class ResourceManager extends SingletonManager {
    static get instance() {
        return super.GetInstance<ResourceManager>();
    }

    loadRes<T extends Asset>(path: string, type: new (...args: any[]) => T) {
        return new Promise<T>((resolve, reject) => {
            resources.load(path, type, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }

    loadDir<T extends Asset>(path: string, type: new (...args: any[]) => T) {
        return new Promise<T[]>((resolve, reject) => {
            resources.loadDir(path, type, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        });
    }
}
