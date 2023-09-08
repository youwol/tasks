const { Task, Trigger, AsyncLoopAlgorithm, Objects } = require('../dist/@youwol/tasks')

class Loader extends Task {
    constructor() {
        super()
        this.createSignal('objectAdded')
    }
    load(filename) {
        console.log('+ Loading '+filename+'...')
        setTimeout( () => {
            console.log('- done loading '+filename)
            this.emit('objectAdded', {name:filename, coords:[1,2,3,4,5,6]})
        }, 2000 )
    }
}

class Algo extends AsyncLoopAlgorithm {
    constructor(id, max=500) {
        super()
        this.id = id
        this.primes = []
        this.connect('stopped', () => {
            console.log(`===> Algo${this.id} STOPS (and next algos)!!!`)
        })
        this.numberOfIteration = max
    }

    addObject() {
        this.run()
    }

    preLoopCB() {
        this.primes = []
        console.log(`+ Algo${this.id} starts...`)
    }

    doOneLoop(i) {
        const multiplier = 1e9
        let candidate    = i * (multiplier * Math.random())
        let isPrime      = true
        for (let c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
                isPrime = false
                break
            }
        }
        if (isPrime) {
            this.primes.push(candidate)
        }
        if (i%50 === 0) {
            console.log(`  Algo${this.id}: ${i}/${this.numberOfIteration}`)
        }
    }

    postLoopCB() {
        console.log(`===> Algo${this.id} done :-)`)
    }
}



/*

                                          --> algo3
                               --> algo1 |
                              |           --> algo4
button --> loader --> objects
                              |
                               --> algo2 --> algo5
                                    |
                                    |--- (will be stopped by user)

*/

const button  = new Trigger()
const algo1   = new Algo(1, 500)
const algo2   = new Algo(2, 1000)
const algo3   = new Algo(3, 1000)
const algo4   = new Algo(4, 500)
const algo5   = new Algo(5, 5000) // very long run
const objects = new Objects()
const loader  = new Loader()

console.log('START')

// 1) Do the connections...
button. connect('tick',        loader,  'load')
loader. connect('objectAdded', objects, 'add')
objects.connect('objectAdded', algo1,   'addObject')
objects.connect('objectAdded', algo2,   'addObject')
algo1.  connect('finished',    algo3,   'run')
algo1.  connect('finished',    algo4,   'run')
algo2.  connect('finished',    algo5,   'run')
// Simulate a break of algo 2
algo2.connect('started', () => {
    setTimeout( ()=> {
        algo2.stop()
    }, 4000)
})

// 2) Start the workflow...
button.emit('tick', 'my-model.json')
