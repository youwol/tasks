import { Task } from './Task'

export type ForLoopParameters = {
    start?: number,
    stop?: number,
    step?: number
}

export class ForLoop extends Task {
    private _start = 0
    private _stop = 10
    private _step = 1
    private _cur = 0

    constructor(params = {}) {
        super()
        this.createSignal('tick')
    }

    set(params: ForLoopParameters = {}) {
        this._start = params.start || this._start
        this._stop = params.stop || this._stop
        this._step = params.step || this._step
        if (this._start > this._stop && this._step > 0) {
            console.warn('Bad configuration of the ForLoop')
        }
    }

    get startValue() { return this._start }
    set startValue(i) { this._start = i }

    get stopValue() { return this._stop }
    set stopValue(i) { this._stop = i }

    get stepValue() { return this._step }
    set stepValue(i) { this._step = i }

    get currentValue() { return this._cur }

    start() {
        for (this._cur = this._start; this._cur !== this._stop; this._cur += this._step) {
            this.emit('tick', { start: this._start, stop: this._stop, current: this._cur })
        }
    }
}
