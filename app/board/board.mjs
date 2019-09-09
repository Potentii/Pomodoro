export default class Board{

	constructor(_id, name){
		this._id = _id;
		this.name = name;
	}


	/**
	 *
	 * @param {*|Board} obj
	 * @returns {Board}
	 */
	static from(obj){
		return new Board(
			obj._id,
			obj.name,
		);
	}


	get id(){
		return this._id;
	}

}