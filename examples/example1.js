const { Trigger, Equals, Between, Counter, Chronometer, Value } = require('../dist/@youwol/tasks')

/*

            equals(3) --> console
counter -->
        --> console
        --> between(2,4) --> console
*/

const chrono = new Chronometer()
const counter = new Counter()
const equals = new Equals(3)
const between = new Between(2, 4)
const reset = new Trigger()
const inc = new Trigger()
const value = new Value()

reset.connect('tick', counter, 'reset')
inc.connect('tick', counter, 'inc')

counter.connect('changed', value => console.log('--> counter =', value))
counter.connect('changed', between, 'setValue')
counter.connect('changed', equals, 'setB')
counter.connect('changed', value, 'a')

value.connect('changed', value => console.log('  * value =', value))
between.connect('tick', value => console.log('  *', between.min(), '<=', value, '<=', between.max()))
equals.connect('tick', value => console.log('  * Equals values: ' + value))
chrono.connect('started', () => console.log('------------------------'))
chrono.connect('finished', value => console.log('Elapsed time:', value, 'ms'))

chrono.start()
inc.emit('tick')
inc.emit('tick')
inc.emit('tick')
inc.emit('tick')
inc.emit('tick')
reset.emit('tick')
inc.emit('tick')
inc.emit('tick')
inc.emit('tick')
inc.emit('tick')
inc.emit('tick')
chrono.stop()
