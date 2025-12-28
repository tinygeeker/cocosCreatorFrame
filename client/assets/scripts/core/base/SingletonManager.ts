export default class SingletonManager {
    private static _instance: any = null;

    protected constructor() { }

    static GetInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this();
        }
        return this._instance;
    }
}
