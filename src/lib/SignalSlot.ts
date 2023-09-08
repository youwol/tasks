/**
   * Create a new signal
   * @param {Object}  sender The sender which will hold the signal
   * @param {String}  signal The name of the signal
   */
export function createSignal(sender: any, signal: string) {
    if (!sender._mapSignals) {
        sender._mapSignals = new Map()
    }

    if (sender._mapSignals.has(signal)) {
        console.error(`Signal named ${signal} already defined.`)
        return
    }

    sender._mapSignals.set(signal, [])
}

/**
   * Connect a sender to a receiver using either the signal/slot or the signal/function.
   * The first  use is `connect(a, 'valueChanges', b, 'setValue')`.
   * The second use is `connect(a, 'valueChanges', () => {...})`.
   * @param {Object} sender The sender who emits the signal
   * @param {String} signal The namle of the signal
   * @param {Object/funcion} receiver The receiver object or a function
   * @param {String} slot In case the receiver is an Object, this represents the slot of the receiver
   */
export function connect(sender: any, signal: string, receiver: any, slot: any) {
    if (!sender._mapSignals) {
        console.warn('Emitter is not configured to support any signal. Consider creating a signal first.')
        return
    }
    if (!sender._mapSignals.has(signal)) {
        console.warn(`Emitter does not have a signal named "${signal}"`)
        return
    }
    if (typeof receiver === 'function') {
        sender._mapSignals.get(signal).push({ receiver, desc: null })
        return
    }

    const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(receiver), slot)

    if (desc) {
        if (!desc.get && !desc.value) {
            console.warn(`Receiver does not have a slot named "${slot}"`)
            return
        }
        sender._mapSignals.get(signal).push({ receiver, desc })
    } else {
        if (receiver[slot]) {
            sender._mapSignals.get(signal).push({ receiver, desc: slot })
        } else {
            console.warn(`Receiver does not have a slot named "${slot}"`)
        }
    }
}

export function emit(sender: any, signal: string, ...args: any[]) {
    if (!sender._mapSignals) {
        console.warn('Source does not support Signal/Slot.')
        return
    }

    if (sender._mapSignals.has(signal)) {
        trigger(sender, signal, args)
    } else {
        console.warn(`Source does not have the signal named ${signal}.`)
    }
}

// ------------------------------------------------------------------------
// !!! private (not exported)

function trigger(sender: any, signal: string, args: any[]) {
    sender._mapSignals.get(signal).forEach(pair => {
        if (pair.desc === null) {
            pair.receiver(...args) // function
        } else {
            if (pair.desc.value) {
                pair.desc.value.call(pair.receiver, ...args) // method

            } else if (pair.desc.set) {
                pair.desc.set.call(pair.receiver, ...args) // setter
            } else {
                pair.receiver[pair.desc].call(pair.receiver, ...args) // arrow method
            }
        }
    })
}
