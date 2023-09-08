const { Task, Algorithm, Logger, Trigger, Chronometer } = require('../dist/@youwol/tasks')

class LongTask extends Algorithm {
    run() {
        this.emit('warn', 'LongTask is running...')
        setTimeout( () => {
            this.emit('log', '...done.')
            this.emit('finished')
        }, 1000)
    }
}

class VeryLongTask extends Algorithm {
    run() {
        this.emit('warn', 'VeryLongTask is running...')
        setTimeout( () => {
            this.emit('log', '...done.')
            this.emit('finished')
        }, 3000)
    }
}

class View extends Task {
    constructor(id) {
        super()
        this.id = id
    }
    update(args) {
        this.emit('log', `    Updating View${this.id}`)
    }
}

class Workflow extends Task {
    constructor() {
        super()
        this.log          = new Logger('--->')
        this.timer        = new Chronometer()
        this.longTask     = new LongTask()
        this.veryLongTask = new VeryLongTask()
        this.views        = [new View(0), new View(1), new View(2)]

        this.log.connectAllSignalsTo(this.longTask)
        this.log.connectAllSignalsTo(this.veryLongTask)
        this.log.connectAllSignalsTo(this)
        this.views.forEach( view => this.log.connectAllSignalsTo(view) )

        this.connect('started' , this.timer, 'start')
        this.veryLongTask.connect('finished', this.timer, 'stop' )
        this.longTask.connect('finished', this.timer, 'stop' )
        this.timer.connect('finished', (ms) => {
            console.log(`--> Elapsed time: ${ms} ms`)
        })

        this.longTask.connect    ('finished', this.veryLongTask, 'run')
        this.veryLongTask.connect('finished', () => this.emit('log', 'All tasks are done!') )
        //this.veryLongTask.connect('finished', this, 'done')

        this.longTask.connect    ('finished', this.views[0], 'update')
        this.longTask.connect    ('finished', this.views[2], 'update')
        this.veryLongTask.connect('finished', this.views[1], 'update')
        this.veryLongTask.connect('finished', this.views[2], 'update')
        this.veryLongTask.connect('finished', () => console.log('END'))
    }

    start() {
        this.emit('started')
        this.longTask.run()
    }
}

const button   = new Trigger()
const workflow = new Workflow()
button.connect('tick', workflow, 'start')

button.emit('tick')
