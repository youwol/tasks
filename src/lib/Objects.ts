import { Task } from './Task'

/**
 * Placeholder a list of or objects.
 * Add new signals `objectAdded`, `objectRemoved`, `objectEdited`, `geomChanged` and `topoChanged`.
 * The signal `objectEdited` is generic in a sens that we do not know if the
 * changes was about the topo or the geom.
 * Do not forget to emit the right signal for best performance.
 */
export class Objects extends Task {
    objects_: any[] = []

    constructor() {
        super()
        this.createSignal('objectAdded')
        this.createSignal('objectEdited')
        this.createSignal('objectRemoved')
        this.createSignal('geomChanged')
        this.createSignal('topoChanged')
    }

    add(object: any) {
        this.objects_.push(object)
        this.emit('objectAdded', { caller: this, object })
    }

    remove(object: any) {
        const index = this.objects_.indexOf(object)

        if (index > -1) {
            this.objects_.splice(index, 1)
            this.emit('objectRemoved', { caller: this, object })
        }
    }

    get objects() {
        return this.objects_
    }
}
