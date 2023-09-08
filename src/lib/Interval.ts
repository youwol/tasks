import { Task } from './Task'

export type IntervalParameters = {
    nbRuns?: number,
    delay?: any

}

export class Interval extends Task {
    private interval: any = undefined
    private tick = 0
    private nbRuns = 1
    private delay = 1000 // ms

    constructor(params: IntervalParameters = {}) {
        super()
        this.createSignal('tick')
        this.nbRuns = params.nbRuns || 1
        this.delay = params.delay || 1000 // ms
    }

    start() {
        this.interval = setInterval(() => {
            if (this.tick === this.nbRuns) {
                this.emit('warn', 'Interval stopped emitting...')
                clearInterval(this.interval)
            } else {
                this.emit('tick', { tick: this.tick, max: this.nbRuns })
            }
            this.tick++
        }, this.delay)
    }
}
