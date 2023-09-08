import { FlowAlgorithm } from './FlowAlgorithm'

/**
 * Client code have to override the doJob() method
 * @see FlowAlgorithm
 */
export class SequentialAlgorithm extends FlowAlgorithm {
    async exec(args: any[] = undefined) {
        this.emit('started')

        this._jobs.forEach(async (job) => {
            return await this.doJob(job)
        })

        this.emit('finished')
    }
}
