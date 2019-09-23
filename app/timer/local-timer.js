// const timers = [];


import TaskExecution from '../board/task/task-execution';



const TIMER_STATES = Object.freeze({
	STARTED: 'STARTED',
	PAUSED: 'PAUSED',
	FINISHED: 'FINISHED'
});


export default class LocalTimer{

	/**
	 * @deprecated
	 * @private
	 * @param {String} name
	 * @param {Number} [ms]
	 * @param {TaskExecution} [execution]
	 * @param {String} [timer_id]
	 */
	constructor(name, ms = 0, execution = new TaskExecution(), timer_id){
		this.name = name;
		this.ms = ms;
		this.execution = execution;
		this.timer_id = timer_id;
	}


	static from(obj){
		return new LocalTimer(
			obj.name,
			obj.ms,
			obj.execution ? TaskExecution.from(obj.execution) : null,
			obj.timer_id,
		);
	}


	static get STATES(){
		return TIMER_STATES;
	}


	static async createNew(name, ms){
		return new LocalTimer(name, ms);
	}


	// static setTimer(name, ms, callback){
	// 	const timer_id = setTimeout(() => {
	// 		callback();
	// 	}, ms);
	//
	// 	timers.push(timer_id, name, ms);
	// }



	static _clearJSTimeout(js_timer_id){
		clearTimeout(js_timer_id);
	}

	static _startJSTimeout(callback, ms){
		return setTimeout(callback, ms);
	}



	// static async pauseTimer(name){
	// 	throw new Error(`Not implemented yet`);
	// }


	async pause(){
		this.execution.setAsPausedNow();
		LocalTimer._clearJSTimeout(this.timer_id);
	}


	// static async resumeTimer(name){
	// 	throw new Error(`Not implemented yet`);
	// }

	static async _getAllFromCache(){
		const timers_str = localStorage.getItem('pomodoro:local-timers');
		try{
			return timers_str ? LocalTimer.from(JSON.parse(timers_str)) : [];
		} catch(err){
			return [];
		}
	}

	static async _setAllOnCache(timers){
		localStorage.setItem('pomodoro:local-timers', JSON.stringify(timers));
	}


	async _setInCache(){
		const timers = await LocalTimer._getAllFromCache();
		// timers.find(t => t.)
		await LocalTimer._setAllOnCache(timers);
	}


	async resume(){

		const remaining_time = 0;
		this.timer_id = LocalTimer._startJSTimeout(() => {
			this.finish();
		}, remaining_time);

		await this._setInCache();
	}


	// static async removeTimer(name){
	// 	throw new Error(`Not implemented yet`);
	// }


	async finish(){

	}

}