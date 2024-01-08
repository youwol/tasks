import { Task } from './Task'

/**
 * Emit the `changed` signal when a new item is selected
 */
export class Combo extends Task {
    private _id = -1
    private _choices: string[] = []

    constructor(choices: any[] = undefined) {
        super()
        this.createSignal('changed')
        if (choices) {
            this.choices = choices
        }
    }

    set choices(choices: any[]) {
        this._choices = [...choices]
    }

    set selection(a: string | number) {
        if (a && typeof a === 'string') {
            const id = this._choices.indexOf(a)

            if (id !== -1 && id !== this._id) {
                this._id = id
                this.emit('changed', {
                    id: this._id,
                    name: this._choices[this._id],
                })
            }
        } else {
            // assume Int
            if (this._id === (a as number)) {
                return
            }
            if ((a as number) < 0 || (a as number) >= this._choices.length) {
                return
            }
            this._id = a as number
            this.emit('changed', {
                id: this._id,
                name: this._choices[this._id],
            })
        }
    }

    get selection() {
        if (this._choices.length > 0) {
            return this._choices[this._id]
        }
        return ''
    }
    get id() {
        if (this._choices.length > 0) {
            return this._id
        }
        return -1 // no items
    }
}
