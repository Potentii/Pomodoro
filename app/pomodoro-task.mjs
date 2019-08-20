/**
 *
 * @type {Readonly<String, String>}
 */
const TYPES = Object.freeze({
	POMODORO: 'POMODORO',
	LONG_INTERVAL: 'LONG_INTERVAL',
	SHORT_INTERVAL: 'SHORT_INTERVAL',
});


export default class PomodoroTask{

	/**
	 *
	 * @param {String} _id
	 * @param {String} name
	 * @param {String} type
	 * @param {Number} duration_ms
	 */
	constructor(_id, name, type, duration_ms){
		this._id = _id;
		this.name = name;
		this.type = type;
		this.duration_ms = duration_ms;

	}



	static get TYPES(){
		return TYPES;
	}


	/**
	 *
	 * @returns {Number}
	 */
	get duration_min(){
		if(!this.duration_ms)
			return 0;

		return this.duration_ms / 60000;
	}

}