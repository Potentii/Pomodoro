const timers = [];


const TIMER_STATES = Object.freeze({
	STARTED: 'STARTED',
	PAUSED: 'PAUSED',
	FINISHED: 'FINISHED'
});


export default class Timer{

	/**
	 * @deprecated
	 * @private
	 * @param {String} timerId
	 * @param {String} name
	 * @param {Number} [ms]
	 * @param {String} [state]
	 */
	constructor(timerId, name, ms = 0, state = TIMER_STATES.STARTED){
		this.timerId = timerId;
		this.name = name;
		this.ms = ms;
		this.state = state;
	}


	static from(obj){
		return new Timer(
			obj.timerId,
			obj.name,
			obj.ms,
			obj.state,
		);
	}


	static get STATES(){
		return TIMER_STATES;
	}


	static setTimer(name, ms, callback){
		const timerId = setTimeout(() => {
			callback();
		}, ms);

		timers.push(timerId, name, ms);
	}


	static pauseTimer(name){
		throw new Error(`Not implemented yet`);
	}


	static resumeTimer(name){
		throw new Error(`Not implemented yet`);
	}


	static removeTimer(name){
		throw new Error(`Not implemented yet`);
	}

}