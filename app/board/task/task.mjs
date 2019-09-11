import TaskExecution from './task-execution';


const TYPES = Object.freeze({
	POMODORO: 'POMODORO',
	LONG_INTERVAL: 'LONG_INTERVAL',
	SHORT_INTERVAL: 'SHORT_INTERVAL',
});


export default class Task{

	/**
	 *
	 * @param {String} _id
	 * @param {String} title
	 * @param {Number} duration
	 * @param {String} [type]
	 * @param {TaskExecution} [execution]
	 */
	constructor(_id, title, duration, type = TYPES.POMODORO, execution = null){
		this._id = _id;
		this.title = title;
		this.duration = duration;
		this.type = type;
		this.execution = execution;
	}


	/**
	 *
	 * @param {*|Task} obj
	 * @returns {Task}
	 */
	static from(obj){
		return new Task(
			obj._id,
			obj.title,
			obj.duration,
			obj.type,
			obj.execution ? TaskExecution.from(obj.execution) : null,
		);
	}


	/**
	 *
	 * @returns {String}
	 */
	get id(){
		return this._id;
	}


	static get TYPES(){
		return TYPES;
	}


	/**
	 *
	 * @returns {boolean}
	 */
	isPomodoroTask(){
		return this.type === TYPES.POMODORO;
	}


	/**
	 *
	 * @returns {boolean}
	 */
	isLongInterval(){
		return this.type === TYPES.LONG_INTERVAL;
	}


	/**
	 *
	 * @returns {boolean}
	 */
	isShortInterval(){
		return this.type === TYPES.SHORT_INTERVAL;
	}


	setAsStartedNow(){
		if(!this.execution)
			this.execution = new TaskExecution(0);

		this.execution.setAsStartedNow();
	}


	setAsPausedNow(){
		if(!this.execution)
			throw new Error(`Cannot pause task "${this._id}": Task has not yet been started`);

		this.execution.setAsPausedNow();
	}


	setAsFinishedNow(){
		if(!this.execution)
			throw new Error(`Cannot finish task "${this._id}": Task has not yet been started`);

		this.execution.setAsFinishedNow();
	}


	/**
	 *
	 * @returns {boolean}
	 */
	hasStarted(){
		return !!this.execution?.started_ts;
	}


	/**
	 *
	 * @returns {boolean}
	 */
	isRunning(){
		return !!this.execution?.started_ts && !this.isPaused() && !this.isDone();
	}


	/**
	 *
	 * @returns {boolean}
	 */
	isPaused(){
		return !!this.execution?.paused_ts && !this.isDone();
	}


	/**
	 *
	 * @returns {boolean}
	 */
	isDone(){
		return !!this.execution?.finished_ts;
	}


	/**
	 *
	 * @returns {Number}
	 */
	get elapsed_time(){
		if(!this.hasStarted())
			return 0;

		if(this.isPaused() && this.execution.paused_ts >= this.execution.started_ts)
			return this.execution.paused_ts - this.execution.started_ts;

		if(this.isDone())
			return this.duration;

		const since = Date.now();

		return since - this.execution.started_ts;
	}


	/**
	 *
	 * @returns {Number}
	 */
	get remaining_time(){
		return this.duration - this.elapsed_time;
	}

}