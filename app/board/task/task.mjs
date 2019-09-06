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
	 * @param {String} _board
	 * @param {String} title
	 * @param {Number} duration
	 * @param {String} [type]
	 * @param {TaskExecution} [execution]
	 */
	constructor(_id, _board, title, duration, type = TYPES.POMODORO, execution = null){
		this._id = _id;
		this._board = _board;
		this.title = title;
		this.duration = duration;
		this.type = type;
		this.execution = execution;
	}


	static from(obj){
		return new Task(
			obj._id,
			obj._board,
			obj.title,
			obj.duration,
			obj.type,
			obj.execution ? TaskExecution.from(obj.execution) : null,
		);
	}


	static get TYPES(){
		return TYPES;
	}

	isPomodoroTask(){
		return this.type === TYPES.POMODORO;
	}

	isLongInterval(){
		return this.type === TYPES.LONG_INTERVAL;
	}

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


	hasStarted(){
		return !!this.execution?.started_ts;
	}

	isRunning(){
		return !!this.execution?.started_ts && !this.isPaused() && !this.isDone();
	}

	isPaused(){
		return !!this.execution?.paused_ts && !this.isDone();
	}

	isDone(){
		return !!this.execution?.finished_ts;
	}


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

}