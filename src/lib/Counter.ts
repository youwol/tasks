import { Task } from './Task'

export class Counter extends Task {
    private _start = 0
    private _a = 0

    constructor(start = 0) {
        super()
        this.createSignal('changed')
        this._start = start
        this._a = start
    }

    get value() {
        return this._a
    }

    inc() {
        this._a++
        this.emit('changed', this._a)
    }
    dec() {
        if (this._a > this._start) {
            this._a--
            this.emit('changed', this._a)
        }
    }
    reset() {
        if (this._a !== this._start) {
            this._a = this._start
            this.emit('changed', this._a)
        }
    }
}
