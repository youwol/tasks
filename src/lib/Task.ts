import { emit, createSignal, connect } from './SignalSlot'

/**
 * Base class for all tasks.
 * Define the signals 'started' and 'finished' for all tasks.
 */
export class Task {
    constructor() {
        this.createSignal('started')
        this.createSignal('finished')

        this.createSignal('log')
        this.createSignal('warn')
        this.createSignal('error')
    }

    emit(signal: any, ...args: any[]) {
        emit(this, signal, ...args)
    }

    createSignal(signal: any) {
        createSignal(this, signal)
    }

    connect(signal: any, receiver: any, slot: any) {
        connect(this, signal, receiver, slot)
    }

}
