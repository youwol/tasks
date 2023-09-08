import { Task } from './Task'

export class Trigger extends Task {
    constructor() {
        super()
        this.createSignal('tick')
    }

    tick() {
        this.emit('tick')
    }

}
