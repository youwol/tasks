import { Task } from './Task'
// import { Wol } from '../Wol.js'

async function connect(ctx, t) {
    ctx.connectAllSignalsTo(t)
}

export class Logger extends Task {
    private prefix = undefined

    constructor(prefix = '>>') {
        super()
        this.prefix = prefix
    }

    log(msg: any) { console.log(this.prefix, msg) }
    warn(msg: any) { console.warn(this.prefix, msg) }
    error(msg: any) { console.error(this.prefix, msg) }

    static createSignalsFor(task: Task) {
        ['log', 'warn', 'error'].forEach(name => task.createSignal(name))
    }

    connectAllSignalsTo(task: Task) {
        if (Array.isArray(task)) {
            const self = this

            task.forEach(t => connect(self, t))
        } else {
            ['log', 'warn', 'error'].forEach(name => task.connect(name, this, name))
        }
    }
}
