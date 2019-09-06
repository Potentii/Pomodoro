export default class TaskExecution{

	/**
	 *
	 * @param {Number} started_ts The last UNIX epoch timestamp that this task started executing, in ms
	 * @param {Number} [paused_ts] The last UNIX epoch timestamp that this task paused executing, in ms
	 * @param {Number} [finished_ts] The last UNIX epoch timestamp that this task finished executing, in ms
	 */
	constructor(started_ts, paused_ts, finished_ts){
		this.started_ts = started_ts;
		this.paused_ts = paused_ts;
		this.finished_ts = finished_ts;
	}


	static from(obj){
		return new TaskExecution(
			obj.started_ts,
			obj.paused_ts,
			obj.finished_ts,
		);
	}


	setAsStartedNow(){
		this.started_ts  = Date.now();
		this.paused_ts   = null;
		this.finished_ts = null;
	}


	setAsPausedNow(){
		this.paused_ts   = Date.now();
		this.finished_ts = null;
	}


	setAsFinishedNow(){
		this.finished_ts = Date.now();
	}

}