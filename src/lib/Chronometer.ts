import { Task } from './Task'

export class Chronometer extends Task {
    startTime: Date = undefined

    start() {
        this.startTime = new Date()
        this.emit('started')
    }

    /**
     * @return the elapsed in milliseconds
     */
    stop() {
        if (this.startTime === undefined) {
            this.emit('error', 'Chronometer not started.')
            return 0
        }

        const timeDiff = new Date().getTime() - this.startTime.getTime() // in ms
        this.emit('finished', timeDiff)

        return timeDiff
    }
}
