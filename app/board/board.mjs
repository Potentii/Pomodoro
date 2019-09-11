import Task from './task/task';



export default class Board{

	/**
	 *
	 * @param {String} _id
	 * @param {String} name
	 * @param {Task[]} [tasks=[]]
	 */
	constructor(_id, name, tasks = []){
		this._id = _id;
		this.name = name;
		this.tasks = tasks;
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
			obj.tasks?.map?.(Task.from)
		);
	}


	/**
	 *
	 * @returns {String}
	 */
	get id(){
		return this._id;
	}


	/**
	 *
	 * @returns {Task}
	 */
	get current_task(){
		return this.tasks.find(t => t.isRunning() || t.isPaused());
	}


	/**
	 *
	 * @returns {Task[]}
	 */
	get not_started_tasks(){
		return this.tasks.filter(t => !t.hasStarted());
	}

}