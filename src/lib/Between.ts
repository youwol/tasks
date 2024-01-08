import { Task } from './Task'

/**
 * Between a and b condition: a<= value <= b.
 * a, b and value are Number
 * Emit signal 'tick'
 */
export class Between extends Task {
    private _min = 0
    private _max = 1
    private _value = 0

    constructor(min = 0, max = 1, value = 0) {
        super()
        this.createSignal('tick')

        if (min > max) {
            this._min = max
            this._max = min
        } else {
            this._min = min
            this._max = max
        }

        if (value < this._min) {
            this._value = this._min
        } else if (value > this._max) {
            this._value = this._max
        } else {
            this._value = value
        }
    }

    setMin(min: number) {
        if (this._min !== min && min < this._max) {
            this._min = min
        }
    }

    min() {
        return this._min
    }
    max() {
        return this._max
    }

    setMax(max: number) {
        if (this._max !== max && max > this._min) {
            this._max = max
        }
    }

    setValue(v: number) {
        if (v >= this._min && v <= this._max) {
            this._value = v
            this.emit('tick', this._value)
        }
    }
}
