export default class Board{

	constructor(_id, name){
		this._id = _id;
		this.name = name;
	}


	static from(obj){
		return new Board(
			obj._id,
			obj.name,
		);
	}

}