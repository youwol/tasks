const { connect, createSignal, emit } = require('../dist/@youwol/tasks')

class Counter {
    constructor() {
        this._value = 0
        createSignal(this, 'valueChanged')

        // Slot Arrow
        // IMPORTANT. As we don't want to use Babel for transpiling, we need to
        // put this method in the constructor directly. Otherwise, arrow method
        // doesn't work with node.js or phi (but DO work in browsers)
        //
        // Not very elegant :-(
        this.showDouble = () => {
            console.log(`  2*${this._value} = ${2 * this._value}`)
        }

        // For the method showTripple, we need to bind this as we use it like that:
        // connect(b, 'valueChanged',  b.showTripple)
        // and not like that (no binding necessary):
        // connect(b, 'valueChanged',  b, 'showTripple')
        this.showTripple = this.showTripple.bind(this)
    }

    get value() {
        return this._value
    }

    // Slot Setter
    set value(value) {
        // slot
        if (value != this._value) {
            this._value = value
            emit(this, 'valueChanged', value)
        }
    }

    // Slot Method
    showTripple() {
        console.log(`  3*${this._value} = ${3 * this._value}`)
    }

    // Slot Multiple parameters
    setParams(a, b, c) {
        console.log(`method with 3 params: (a=${a}, b=${b}, c=${c})`)
    }
}

// -----------------------------------------------------------

function w(...msg) {
    console.log(...msg)
}

const a = new Counter()
const b = new Counter()
// Create a signal in b afterward
createSignal(b, 'paramsChanged')

// Perform the connections
connect(a, 'valueChanged', (v) => console.log('Value of a changed to', v))
connect(a, 'valueChanged', b, 'value')
connect(b, 'valueChanged', (v) => console.log('Value of b changed to', v))
connect(b, 'valueChanged', b, 'showDouble')
connect(b, 'valueChanged', b.showTripple)
connect(b, 'paramsChanged', b, 'setParams')

w('---------------------------')
a.value = 12
w('---------------------------')
b.value = 48
w('---------------------------')
w('(should not trigger anything)')
a.value = 12 // does not trigger anything since same value
w('---------------------------')
emit(b, 'paramsChanged', 1, 2, 3)
w('---------------------------')
