import { Algorithm } from './Algorithm'

/**
 * This extended Algorithm allows client code to make its long algorithm (or numerical code)
 * to be asynchronous when the sus-mentioned algo.
 *
 * For long run the goal is to use Web Workers or Share Web Workers.
 * However, right now the 'import' is not supported by them. When it will be possible,
 * the command `new Worker("worker.js", { type: "module" });` will let the worker
 * to use the import statement. Right now, only the `importScripts()` can be used.
 * To check your browser, run this page `https://html.spec.whatwg.org/demos/workers/modules/page.html`
 * and look at the dev-console.
 * As an example on 2019-06-17, Chrome returns:
 * `Uncaught TypeError: Failed to construct 'Worker': Module scripts are not supported on DedicatedWorker yet
 * (see https://crbug.com/680046)`
 * @see HTML spec about Web Workers: https://html.spec.whatwg.org/#module-worker-example
 *
 * For the time being, the best is to use `setTimeout(fct, 1)`, where fct is a function to perform calculation.
 * @see Algorithm
 */
export class AsyncLoopAlgorithm extends Algorithm {
    private _max = 10

    constructor() {
        super()
        this.createSignal('stopped')
    }

    set numberOfIteration(n) {
        this._max = n
    }
    get numberOfIteration() {
        return this._max
    }

    preLoopCB() {
        // Client code for one loop
    }

    doOneLoop(i) {
        // Client code for one loop
    }

    postLoopCB() {
        // Client code for one loop
    }

    exec(args: any[]) {
        this.preLoopCB()

        const p = new Promise((resolve, reject) => {
            this.doLoop(0, resolve, reject)
        })

        p.then(
            () => {
                this.postLoopCB()
                this.emit('finished')
            },
            (raison) => {
                this.emit('stopped', raison)
            },
        )
    }

    doLoop(i: number, resolve: Function, reject: Function) {
        if (i === this._max) {
            resolve()
            return
        }

        this.doOneLoop(i)

        if (this.stopRequested()) {
            reject()
            return
        }

        setTimeout(() => this.doLoop(i + 1, resolve, reject), 1)
    }
}
