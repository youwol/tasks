import { Algorithm } from './Algorithm'

/**
 * Base class for SequentialAlgorithm and ParallelAlgorithm
 */
export class FlowAlgorithm extends Algorithm {
    protected _jobs = [] // list of Algorithms or sub-algorithms

    addAlgorithm(job: Algorithm) {
        this._jobs.push(job)
    }

    /**
     *
     * @param {Algorithm} job Run the current job. Client code
     * can override this method to perform more complex things.
     * Default implementation run the job by calling exec() on it.
     */
    async doJob(job: Algorithm, args: any[] = undefined) {
        job.exec(args)
    }
}
