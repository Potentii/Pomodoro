export default class LocalTimer{

	#timer_id = null;


	/**
	 * @private
	 * @param {String} _id
	 * @param {Number} [ms]
	 */
	constructor(_id, ms = 0){
		this._id = _id;
		this.ms = ms;
	}


	static from(obj){
		return new LocalTimer(
			obj._id,
			obj.ms,
		);
	}


	get id(){
		return this._id;
	}


	static async createNew(_id, ms){
		if(arguments.length == 1 && typeof _id == 'number'){
			ms = _id;
			_id = Math.round(Math.random() * 10000) + '';
		}
		return new LocalTimer(_id, ms);
	}


	static _clearJSTimeout(js_timer_id){
		clearTimeout(js_timer_id);
	}


	static _startJSTimeout(callback, ms){
		return setTimeout(callback, ms);
	}


	async start(callback){
		if(this.#timer_id)
			await this.finish();

		this.#timer_id = LocalTimer._startJSTimeout(callback, this.ms);
	}


	async finish(){
		LocalTimer._clearJSTimeout(this.#timer_id);
		this.#timer_id = null;
	}

}