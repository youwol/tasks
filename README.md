# <center>tasks.js</center>

A simple library wich allows to connect `Task`s asynchronously or not.

## Example

```js
const {
    Trigger,
    Equals,
    Between,
    Counter,
    Chronometer,
    Value,
} = require('../dist/@youwol/tasks')

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

counter.connect('changed', (value) => console.log('--> counter =', value))
counter.connect('changed', between, 'setValue')
counter.connect('changed', equals, 'setB')
counter.connect('changed', value, 'a')

value.connect('changed', (value) => console.log('  * value =', value))
between.connect('tick', (value) =>
    console.log('  *', between.min(), '<=', value, '<=', between.max()),
)
equals.connect('tick', (value) => console.log('  * Equals values: ' + value))
chrono.connect('started', () => console.log('------------------------'))
chrono.connect('finished', (value) => console.log('Elapsed time:', value, 'ms'))

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
```

Should display

```txt
------------------------
--> counter = 1
  * value = 1
--> counter = 2
  * 2 <= 2 <= 4
  * value = 2
--> counter = 3
  * 2 <= 3 <= 4
  * Equals values: 3
  * value = 3
--> counter = 4
  * 2 <= 4 <= 4
  * value = 4
--> counter = 5
  * value = 5
--> counter = 0
  * value = 0
--> counter = 1
  * value = 1
--> counter = 2
  * 2 <= 2 <= 4
  * value = 2
--> counter = 3
  * 2 <= 3 <= 4
  * Equals values: 3
  * value = 3
--> counter = 4
  * 2 <= 4 <= 4
  * value = 4
--> counter = 5
  * value = 5
Elapsed time: 5 ms
```
