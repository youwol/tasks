import { Task } from './Task'

/**
 * Base class for algorithm.
 *
 * @see AsyncLoopAlgorithm
 * @see SequentialAlgorithm
 * @see ParallelAlgorithm
 */
export class Algorithm extends Task {
    private _dirty = true
    private _stopRequested = false
    private _isRunning = false

    exec(args: any[] = undefined) {
        // CLient code shoudl override this method
    }

    stopRequested() {
        return this._stopRequested
    }

    stop() {
        this._stopRequested = true
    }

    isRunning() {
        return this._isRunning
    }

    isDirty() {
        return this._dirty
    }

    setDirty(d: boolean) {
        this._dirty = d
        if (d) {
            this._stopRequested = true
        }
    }

    async run(args: any[] = undefined) {
        if (this._isRunning) {
            if (this._dirty) {
                this._stopRequested = true
            }
            return
        }

        this.setDirty(false)
        this._stopRequested = false // we never know
        this._isRunning = true
        this.emit('started')
        this.exec(args)
    }

}
