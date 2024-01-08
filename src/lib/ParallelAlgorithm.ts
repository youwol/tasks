import { FlowAlgorithm } from './FlowAlgorithm'

/**
 * Client code have to override the doJob() method
 * @see FlowAlgorithm
 */
class ParallelAlgorithm extends FlowAlgorithm {
    async exec(args: any[]) {
        this.emit('started')
        let promises = this._jobs.map((job) => this.doJob(job))

        await Promise.all(promises).then(() => {
            this.emit('finished')
        })
    }
}
