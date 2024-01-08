import { Task } from './Task'

/**
 * Base class for some boolean tasks.
 * Emit a 'tick' signal when a condition is added, removed or changed
 * @see And
 * @see Or
 */
export abstract class Boolean extends Task {
    protected _a: boolean = undefined
    protected _b: boolean = undefined

    constructor(params = {}) {
        super()
        this.createSignal('tick')
    }

    setA(value: boolean) {
        if (value && value !== this._a) {
            this._a = value
            this.perform()
        }
    }

    setB(value: boolean) {
        if (value && value !== this._b) {
            this._b = value
            this.perform()
        }
    }

    removeA() {
        this._a = undefined
    }

    removeB() {
        this._b = undefined
    }

    protected abstract check(): boolean

    private perform() {
        if (this._a !== undefined && this._b !== undefined) {
            if (this.check()) {
                this.emit('tick', this._a)
            }
        }
    }
}

export class And extends Boolean {
    protected check() {
        return this._a && this._b
    }
}

export class Or extends Boolean {
    protected check() {
        return this._a || this._b
    }
}

export class Equals extends Boolean {
    constructor(a = undefined, b = undefined) {
        super()
        this.setA(a)
        this.setB(b)
    }
    protected check() {
        return this._a === this._b
    }
}
