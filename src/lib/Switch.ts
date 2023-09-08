

import { Task } from './Task'

export class Switch extends Task {
    private _checked = false

    constructor() {
        super()
        this.createSignal('tick')
    }

    get checked() {
        return this._checked
    }

    set checked(b: boolean) {
        if (b !== undefined && b !== this._checked) {
            this._checked = b
            this.emit('tick', this._checked)
        } else {
            this._checked = !this._checked
            this.emit('tick', this._checked)
        }
    }
}
