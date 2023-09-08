import { Task } from './Task'

export class Value extends Task {
    private _a = 0

    constructor(a = 0) {
        super()
        this.createSignal('changed')
        this._a = a
    }

    get a() {
        return this._a
    }

    set a(v) {
        if (v !== this._a) {
            this._a = v
            this.emit('changed', this._a)
        }
    }
}
